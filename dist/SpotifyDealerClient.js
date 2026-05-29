"use strict";
// SpotifyDealerClient.js — push-based Spotify playback via dealer WebSocket
// Replaces 5s polling with event-driven track change notifications.
// Falls back gracefully: if dealer fails, PlaybackStateUpdater polling takes over.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyDealerClient = void 0;
const WebSocket = require("ws");
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");

const DEALER_URL = "wss://guc3-dealer.spotify.com/";
const TOKEN_URL  = "https://open.spotify.com/get_access_token?reason=transport&productType=web_player";
const REGISTER_DEVICE_URL  = "https://guc-spclient.spotify.com/track-playback/v1/devices";
const CONNECT_STATE_URL    = "https://guc-spclient.spotify.com/connect-state/v1/devices/hobs_";
const NOTIFY_URL           = "https://api.spotify.com/v1/me/notifications/user";

class SpotifyDealerClient {
    constructor() {
        this._ws = null;
        this._token = null;
        this._connId = null;
        this._hbInterval = null;
        this._reconnectTimer = null;
        this._destroyed = false;
        this._wsInstance = 0;
        this._reconnectAttempts = 0;
        this._reconnectDelay = 5000;
        this._connecting = false; // CONN-17
        /** Called when a full player state arrives. Receives parsed player_state object. */
        this.onPlayerState = null;
        /** Called when dealer fully connects and is ready. */
        this.onReady = null;
        /** True while connected and subscribed. */
        this.connected = false;
    }

    async _getAccessToken() {
        // Prefer the token already fetched by Server.js refreshSpotifyWebToken()
        const cached = Settings_1.Settings.credentials.spotifyWebToken;
        const expiry = Settings_1.Settings.credentials.spotifyWebTokenExpiry || 0;
        if (cached && expiry > Date.now() + 60000) {
            Debug_1.Debug.write("[Dealer] Reusing cached spotifyWebToken");
            return cached;
        }
        // Fallback: fetch directly with full browser-like headers
        const cookies = Settings_1.Settings.credentials.cookies || "";
        if (!cookies) throw new Error("[Dealer] No sp_dc cookie configured");
        const res = await fetch(TOKEN_URL, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "app-platform": "WebPlayer",
                "x-requested-with": "XMLHttpRequest",
                "cookie": cookies,
                "Referer": "https://open.spotify.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
            }
        });
        if (!res.ok) throw new Error("[Dealer] Token fetch HTTP " + res.status);
        const j = await res.json();
        if (!j.accessToken) throw new Error("[Dealer] No accessToken in response");
        Debug_1.Debug.write("[Dealer] Got access token (expires in " + (j.accessTokenExpirationTimestampMs ? Math.round((j.accessTokenExpirationTimestampMs - Date.now()) / 60000) + "min" : "?") + ")");
        return j.accessToken;
    }
    async _subscribe(token, connId) {
        // 1. Subscribe to user notifications
        const r1 = await fetch(`${NOTIFY_URL}?connection_id=${encodeURIComponent(connId)}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
        });
        if (!r1.ok) throw new Error("[Dealer] NOTIFY subscribe HTTP " + r1.status);
        // 2. Register fake web client device
        const deviceId = `ls_${connId.slice(0, 16)}`;
        const r2 = await fetch(REGISTER_DEVICE_URL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                device: { device_id: deviceId, device_type: "COMPUTER", client_id: "65b708073fc0480ea92a077233ca87bd", brand: "spotify", model: "web_player" },
                outro_endpoint_logging: false, volume: 65535, do_play_state_restore: false, license_text_header: ""
            })
        });
        if (!r2.ok) throw new Error("[Dealer] REGISTER_DEVICE HTTP " + r2.status);
        // 3. Subscribe to connect-state events
        const r3 = await fetch(`${CONNECT_STATE_URL}${deviceId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ member_type: "CONNECT_STATE", device_id: deviceId })
        });
        if (!r3.ok) throw new Error("[Dealer] CONNECT_STATE subscribe HTTP " + r3.status);
        Debug_1.Debug.write("[Dealer] Subscribed — deviceId: " + deviceId);
    }

    async connect() {
        if (this._destroyed || this._connecting) return; // CONN-17
        this._connecting = true;
        const _inst = ++this._wsInstance;
        Debug_1.Debug.write("[Dealer] Connecting...");
        this.connected = false;
        try {
            this._token = await this._getAccessToken();
        } catch (e) {
            Debug_1.Debug.write(`[Dealer] Auth failed: ${e.message} — will retry`);
            this._connecting = false; // CONN-17
            this._scheduleReconnect();
            return;
        }
        const ws = new WebSocket(`${DEALER_URL}?access_token=${encodeURIComponent(this._token)}`);
        this._ws = ws;

        ws.on("open", () => {
            this._hbInterval = setInterval(() => { if (this._ws && this._ws.readyState === 1) this._ws.send(JSON.stringify({ type: "ping" })); }, 30000);
            Debug_1.Debug.write("[Dealer] WS open");
            this._connecting = false; // CONN-17
            this._reconnectDelay = 5000; this._reconnectAttempts = 0; // CONN-18
        });

        ws.on("message", async (data) => {
            if (this._wsInstance !== _inst) return;
            let msg;
            try { msg = JSON.parse(data.toString()); } catch { return; }

            // Connection ID init
            if (msg.headers?.["Spotify-Connection-Id"]) {
                this._connId = msg.headers["Spotify-Connection-Id"];
                Debug_1.Debug.write(`[Dealer] Got connection ID: ${this._connId}`);
                try {
                    await this._subscribe(this._token, this._connId);
                    this.connected = true;
                    Debug_1.Debug.write("[Dealer] Ready");
                    this.onReady?.();
                } catch (e) {
                    Debug_1.Debug.write(`[Dealer] Subscribe failed: ${e.message}`);
                    ++this._wsInstance; // CONN-03: invalidate stale message handlers before terminate
                    ws.terminate();
                }
                return;
            }

            // Ping — reply pong
            if (msg.type === "ping") { ws.send(JSON.stringify({ type: "pong" })); return; }

            // Player state events
            if (msg.type === "message" && msg.payloads) {
                for (const payload of msg.payloads) {
                    const cluster = payload.cluster;
                    if (cluster?.player_state) {
                        Debug_1.Debug.write("[Dealer] Player state push received");
                        try { this.onPlayerState?.(cluster.player_state, cluster); }
                        catch (e) { Debug_1.Debug.write(`[Dealer] onPlayerState error: ${e}`); }
                    }
                }
            }
        });

        ws.on("error", (e) => {
            Debug_1.Debug.write(`[Dealer] WS error (${e.code || "?"}): ${e.message}`);
        });

        ws.on("close", (code) => {
            if (this._wsInstance !== _inst) return;
            clearInterval(this._hbInterval); this._hbInterval = null;
            this._connecting = false; // CONN-17
            Debug_1.Debug.write(`[Dealer] WS closed (${code})`);
            this.connected = false;
            this._ws = null;
            if (!this._destroyed) this._scheduleReconnect();
        });
    }

    _scheduleReconnect() {
        if (this._reconnectTimer) return;
        if (this._reconnectAttempts >= 10) {
            Debug_1.Debug.write("[Dealer] Max reconnect attempts reached — giving up. Check sp_dc cookie in settings.");
            return;
        }
        this._reconnectAttempts++;
        Debug_1.Debug.write(`[Dealer] Reconnecting in ${this._reconnectDelay / 1000}s (attempt ${this._reconnectAttempts}/10)`);
        this._reconnectTimer = setTimeout(() => {
            this._reconnectTimer = null;
            this._reconnectDelay = Math.min(this._reconnectDelay * 1.5, 60000);
            this.connect();
        }, this._reconnectDelay);
    }

    destroy() {
        this._destroyed = true;
        clearTimeout(this._reconnectTimer);
        clearInterval(this._hbInterval);
        this._ws?.terminate();
        this.connected = false;
    }
}
exports.SpotifyDealerClient = SpotifyDealerClient;
