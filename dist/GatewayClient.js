"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayClient = void 0;
const WebSocket = require("ws");
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");

const GATEWAY_URL = "wss://gateway.discord.gg/?v=10&encoding=json";
const FATAL_CODES = new Set([4004, 4010, 4011, 4012, 4013, 4014]);
const NO_RESUME_CODES = new Set([4007, 4009]);

class GatewayClient {
    constructor() {
        this._ws = null; this._hbTimeout = null; this._hbInterval = null;
        this._seq = null; this._sessionId = null; this._resumeUrl = null;
        this.connected = false; this._reconnecting = false;
        this._destroyed = false; this._ackReceived = false; this._presenceSentTimes = [];
        this._wsInstance = 0; this._lastActivity = null; this._flashStatus = null;
        this._reconnectDelay = 1000;
        this.onReady = null;
    }
    connect() { this._destroyed = false; this._open(false); }
    destroy() { this._destroyed = true; this._clearHB(); try { this._ws?.terminate(); } catch (_) {} this._ws = null; this.connected = false; }

    _reset(ms, canResume) {
        this.connected = false;
        this._clearHB();
        // Set _reconnecting=true immediately so the close handler that terminate() may fire
        // synchronously cannot slip through the guard and schedule a second reconnect (#25)
        this._reconnecting = true;
        const ws = this._ws;
        this._ws = null;
        ++this._wsInstance; // invalidate close handler before terminate so _reset controls reconnect delay
        try { ws?.terminate(); } catch (_) {}
        this._scheduleReconnect(ms, canResume);
    }
    _open(resume) {
        const token = Settings_1.Settings.credentials.token;
        if (!token) { Debug_1.Debug.write("[GatewayClient] No token \u2014 gateway disabled"); return; }
        const url = (resume && this._resumeUrl) ? this._resumeUrl : GATEWAY_URL;
        Debug_1.Debug.write(`[GatewayClient] Connecting... (resume=${resume}, url=${url})`);
        let ws;
        try { ws = new WebSocket(url); } catch (e) { Debug_1.Debug.write(`[GatewayClient] WS create failed: ${e.message}`); this._scheduleReconnect(5000, resume); return; }
        const instance = ++this._wsInstance;
        this._ws = ws;
        ws.on("message", data => {
            if (this._wsInstance !== instance) return;
            let msg; try { msg = JSON.parse(data); } catch { return; }
            if (msg.s != null) this._seq = msg.s;
            switch (msg.op) {
                case 10: {
                    const interval = msg.d.heartbeat_interval;
                    this._startHB(interval);
                    // Fix #21: only RESUME if seq is non-null; null seq is invalid per Discord spec
                    if (resume && this._sessionId && this._seq != null) {
                        Debug_1.Debug.write("[GatewayClient] Sending RESUME");
                        this._send({ op: 6, d: { token, session_id: this._sessionId, seq: this._seq } });
                    } else {
                        this._identify(token);
                    }
                    break;
                }
                case 11: this._ackReceived = true; break;
                case 1:  this._sendHB(); break;
                case 0:
                    if (msg.t === "READY") {
                        this._sessionId = msg.d.session_id;
                        this._resumeUrl = msg.d.resume_gateway_url || GATEWAY_URL;
                        this.connected = true;
                        this._reconnecting = false;
                        this._resetReconnectDelay();
                        Debug_1.Debug.write("[GatewayClient] Connected (READY)");
                        if (typeof this.onReady === "function") { try { this.onReady(); } catch(e) { Debug_1.Debug.write(`[GatewayClient] onReady callback error: ${e}`); } }
                    } else if (msg.t === "RESUMED") {
                        this.connected = true;
                        this._reconnecting = false;
                        this._resetReconnectDelay();
                        Debug_1.Debug.write("[GatewayClient] Resumed");
                        if (typeof this.onReady === "function") { try { this.onReady(); } catch(e) { Debug_1.Debug.write(`[GatewayClient] onReady callback error: ${e}`); } }
                    }
                    break;
                case 7:
                    Debug_1.Debug.write("[GatewayClient] Op 7 \u2014 reconnecting with resume");
                    this._reset(500, true);
                    break;
                case 9:
                    Debug_1.Debug.write(`[GatewayClient] Invalid session (resumable=${msg.d}) \u2014 reconnecting in 5s`);
                    this._reset(5000, !!msg.d);
                    break;
            }
        });
        ws.on("close", code => {
            if (this._wsInstance !== instance) return;
            this.connected = false; this._clearHB();
            if (this._destroyed) return;
            if (FATAL_CODES.has(code)) { Debug_1.Debug.write(`[GatewayClient] Fatal close ${code} \u2014 not reconnecting`); return; }
            const canResume = !NO_RESUME_CODES.has(code);
            Debug_1.Debug.write(`[GatewayClient] Disconnected (${code}) \u2014 reconnecting in 5s (resume=${canResume})`);
            // Do not reset _reconnecting here; let _scheduleReconnect guard itself (#15/#25)
            this._scheduleReconnect(5000, canResume);
        });
        ws.on("error", e => Debug_1.Debug.write(`[GatewayClient] WS error: ${e.message}`));
    }

    _identify(token) {
        const pref = Settings_1.Settings.gateway?.presenceStatus || "online";
        const isMobile = pref === "mobile";
        const status = isMobile ? "online" : pref;
        const props = isMobile
            ? { os: "Android", browser: "Discord Android", device: "discord-android" }
            : { os: "windows", browser: "Discord Client", device: "" };
        // Fix #20: since should be 0 at identify time unless actually idle from before connect
        this._send({ op: 2, d: { token, properties: props, presence: { status, afk: status === "idle", since: 0, activities: [] } } });
    }
    _startHB(interval) {
        // Fix #23: capture the instance counter at start; if _startHB is called again before
        // the timeout fires, the stale closure will detect the mismatch and bail out
        this._clearHB();
        this._ackReceived = true;
        const hbInstance = ++this._wsInstance;
        this._hbTimeout = setTimeout(() => {
            this._hbTimeout = null;
            // Bail if a newer _startHB or _clearHB has run since this timeout was scheduled
            if (this._wsInstance !== hbInstance) return;
            this._ackReceived = false;
            this._send({ op: 1, d: this._seq });
            // Fix #16: start interval only after initial HB is sent; first tick is one full
            // interval later, so _ackReceived will have had time to be set true by the ACK
            this._hbInterval = setInterval(() => {
                if (!this._ackReceived) {
                    Debug_1.Debug.write("[GatewayClient] HB ACK missed \u2014 reconnecting");
                    // Fix #17: ACK miss means session is likely dead; do not attempt resume
                    this._reset(1000, false);
                    return;
                }
                this._ackReceived = false; this._sendHB();
            }, interval);
        }, Math.floor(Math.random() * interval));
    }
    _sendHB() { this._ackReceived = false; this._send({ op: 1, d: this._seq }); }
    _clearHB() { clearTimeout(this._hbTimeout); clearInterval(this._hbInterval); this._hbTimeout = this._hbInterval = null; }
    _scheduleReconnect(ms, canResume) {
        if (this._reconnecting || this._destroyed) return;
        this._reconnecting = true;
        // Fix #18: only advance the backoff when no explicit delay was provided
        let delay;
        if (ms != null) {
            delay = ms;
        } else {
            this._reconnectDelay = Math.min(this._reconnectDelay * 2, 60000);
            delay = this._reconnectDelay;
        }
        setTimeout(() => {
            this._reconnecting = false;
            // Fix #24: re-check _destroyed in case destroy() was called during the delay
            if (!this._destroyed) this._open(canResume);
        }, delay);
    }
    _resetReconnectDelay() { this._reconnectDelay = 1000; }
    _send(payload) {
        if (this._ws?.readyState === WebSocket.OPEN) try { this._ws.send(JSON.stringify(payload)); } catch (e) { Debug_1.Debug.write(`[GatewayClient] Send error: ${e.message}`); }
    }

    flashPresence(status, text, emoji) {
        if (!this.connected) return false;
        this._flashStatus = status;
        let activity = null;
        if (typeof text === "string" && text !== "") {
            activity = { type: 4, name: "Custom Status", state: text, emoji: emoji ? { name: emoji } : null };
        } else if (text == null && this._lastActivity) {
            activity = this._lastActivity;
        }
        const activities = activity ? [activity] : [];
        this._send({ op: 3, d: { since: status === "idle" ? Date.now() : 0, afk: status === "idle", status, activities } });
        Debug_1.Debug.write("[GatewayClient] flashPresence " + status + " | " + (activity ? activity.state : "none"));
        return true;
    }
    clearFlashStatus() { this._flashStatus = null; }
    clearLastActivity() { this._lastActivity = null; }

    setCustomStatus(text, emoji) {
        if (!this.connected) return false;
        const now = Date.now();
        const minGwInterval = Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000;
        // Fix #14: purge stale window entries BEFORE the minGwInterval check so the last
        // entry in _presenceSentTimes is never an unpruned stale timestamp
        while (this._presenceSentTimes.length && now - this._presenceSentTimes[0] > 20000) this._presenceSentTimes.shift();
        if (minGwInterval > 0 && this._presenceSentTimes.length && now - this._presenceSentTimes[this._presenceSentTimes.length - 1] < minGwInterval) {
            Debug_1.Debug.write(`[GatewayClient] op3 min interval (${minGwInterval}ms) not elapsed \u2014 skipping`);
            return false;
        }
        if (this._presenceSentTimes.length >= 5) { Debug_1.Debug.write(`[GatewayClient] op3 rate limit (5/20s) \u2014 skipping`); return false; }
        this._presenceSentTimes.push(now);
        const pref = Settings_1.Settings.gateway?.presenceStatus || "online";
        // Fix #19: _flashStatus must not bleed; only use it if it is still set (cleared externally via clearFlashStatus())
        const status = this._flashStatus || (pref === "mobile" ? "online" : pref);
        const activity = { type: 4, name: "Custom Status", state: text || "", emoji: emoji ? { name: emoji } : null };
        this._lastActivity = activity;
        this._send({ op: 3, d: { since: status === "idle" ? now : 0, afk: status === "idle", status, activities: [activity] } });
        return true;
    }
}
exports.GatewayClient = GatewayClient;
