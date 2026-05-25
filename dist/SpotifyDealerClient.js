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
        this._reconnectDelay = 5000;
        /** Called when a full player state arrives. Receives parsed player_state object. */
        this.onPlayerState = null;
        /** Called when dealer fully connects and is ready. */
        this.onReady = null;
        /** True while connected and subscribed. */
        this.connected = false;
    }

    async _getAccessToken() {
        const cookies = Settings_1.Settings.credentials.cookies || "";
        if (!cookies) throw new Error("[Dealer] No sp_dc cookie configured");
        const res = await fetch(TOKEN_URL, {
            headers: {
                "Cookie": cookies,
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://open.spotify.com/"
            }
        });
        if (!res.ok) throw new Error(`[Dealer] Token fetch HTTP ${res.status}`);
        const j = await res.json();
        if (!j.accessToken) throw new Error("[Dealer] No accessToken in response");
        Debug_1.Debug.write(`[Dealer] Got access token (expires in ${j.accessTokenExpirationTimestampMs ? Math.round((j.accessTokenExpirationTimestampMs - Date.now()) / 60000) + 'min' : '?'})`);
        return j.accessToken;
    }

    async _subscribe(token, connId) {
        // 1. Subscribe to user notifications
        await fetch(`${NOTIFY_URL}?connection_id=${encodeURIComponent(connId)}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
        });
        // 2. Register fake web client device
        const deviceId = `ls_${connId.slice(0, 16)}`;
        await fetch(REGISTER_DEVICE_URL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                device: { device_id: deviceId, device_type: "COMPUTER", client_id: "65b708073fc0480ea92a077233ca87bd", brand: "spotify", model: "web_player" },
                outro_endpoint_logging: false, volume: 65535, do_play_state_restore: false, license_text_header: ""
            })
        });
        // 3. Subscribe to connect-state events
        await fetch(`${CONNECT_STATE_URL}${deviceId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ member_type: "CONNECT_STATE", device_id: deviceId })
        });
        Debug_1.Debug.write(`[Dealer] Subscribed — deviceId: ${deviceId}`);
    }

    async connect() {
        if (this._destroyed) return;
        Debug_1.Debug.write("[Dealer] Connecting...");
        this.connected = false;
        try {
            this._token = await this._getAccessToken();
        } catch (e) {
            Debug_1.Debug.write(`[Dealer] Auth failed: ${e.message} — falling back to polling`);
            return; // leave polling as sole updater
        }
        const ws = new WebSocket(`${DEALER_URL}?access_token=${encodeURIComponent(this._token)}`);
        this._ws = ws;

        ws.on("open", () => {
            Debug_1.Debug.write("[Dealer] WS open");
            this._reconnectDelay = 5000;
        });

        ws.on("message", async (data) => {
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
            Debug_1.Debug.write(`[Dealer] WS error: ${e.message}`);
        });

        ws.on("close", (code) => {
            Debug_1.Debug.write(`[Dealer] WS closed (${code})`);
            this.connected = false;
            this._ws = null;
            if (!this._destroyed) this._scheduleReconnect();
        });
    }

    _scheduleReconnect() {
        if (this._reconnectTimer) return;
        Debug_1.Debug.write(`[Dealer] Reconnecting in ${this._reconnectDelay / 1000}s`);
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
