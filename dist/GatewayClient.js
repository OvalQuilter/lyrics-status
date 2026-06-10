"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayClient = void 0;
const WebSocket = require("ws");
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");
const fs = require("fs");
const path = require("path");

const GATEWAY_URL = "wss://gateway.discord.gg/?v=10&encoding=json";
const FATAL_CODES = new Set([4004, 4010, 4011, 4012, 4013, 4014, 4021]);
const NO_RESUME_CODES = new Set([4002, 4007, 4009]);
const SESSION_PATH = path.resolve(__dirname, "../session.json");

const FATAL_MESSAGES = {
    4004: "Invalid Discord token — check your token in settings.",
    4010: "Invalid shard.",
    4011: "Sharding required.",
    4012: "Invalid API version.",
    4013: "Invalid intent(s).",
    4014: "Disallowed intent(s).",
    4021: "Gateway rate limited — too many reconnects.",
};

function _loadSession(token) {
    try {
        const d = JSON.parse(fs.readFileSync(SESSION_PATH, "utf8"));
        if (d.token === token) return d;
    } catch (_) {}
    return null;
}
function _saveSession(token, sessionId, seq, resumeUrl) {
    if (!sessionId) return; // CONN-05: never persist a null sessionId
    try { fs.writeFileSync(SESSION_PATH, JSON.stringify({ token, sessionId, seq, resumeUrl }), "utf8"); } catch (_) {}
}
function _clearSession() {
    try { fs.unlinkSync(SESSION_PATH); } catch (_) {}
}

class GatewayClient {
    constructor() {
        this._ws = null; this._hbTimeout = null; this._hbInterval = null;
        this._seq = null; this._sessionId = null; this._resumeUrl = null;
        this.connected = false; this._reconnecting = false;
        this._destroyed = false; this._ackReceived = false;
        this._wsInstance = 0; this._hbGeneration = 0; this._lastActivity = null; this._flashStatus = null;
        this._lastRichPresenceActivity = null;
        this._reconnectDelay = 1000;
        this._lastIdentifyAt = 0;
        this.onReady = null;
        this._pst = new Array(5).fill(0); this._pstHead = 0; this._pstCount = 0; this._lastGwSentAt = 0; // RL-14: circular buffer replaces _presenceSentTimes
    }
    get _presenceSentTimes() { const now = Date.now(); const out = []; for (let _i = this._pstCount - 1; _i >= 0; _i--) { const _t = this._pst[(this._pstHead - 1 - _i + 5) % 5]; if (now - _t <= 20000) out.push(_t); } return out; } // RL-14 compat
    connect() {
        this._destroyed = false; this._reconnecting = false;
        const token = Settings_1.Settings.credentials.token;
        const saved = token ? _loadSession(token) : null;
        if (saved) {
            this._sessionId = saved.sessionId;
            this._seq = saved.seq;
            this._resumeUrl = saved.resumeUrl;
            Debug_1.Debug.write("[GatewayClient] Loaded session from disk — will attempt resume");
        }
        this._open(!!saved);
    }
    destroy() { this._destroyed = true; this._reconnecting = false; this._clearHB(); try { this._ws?.terminate(); } catch (_) {} this._ws = null; this.connected = false; }

    _reset(ms, canResume) {
        this.connected = false;
        this._clearHB();
        const ws = this._ws;
        this._ws = null;
        ++this._wsInstance; // CONN-15
        try { ws?.close(4000); } catch (_) { try { ws?.terminate(); } catch (_) {} }
        if (!this._destroyed) {
            this._reconnecting = true;
            let delay;
            if (ms != null) { delay = ms; } else { this._reconnectDelay = Math.min(this._reconnectDelay * 2, 60000); delay = this._reconnectDelay; }
            setTimeout(() => { this._reconnecting = false; if (!this._destroyed) this._open(canResume); }, delay);
        }
    }
    _open(resume) {
        const token = Settings_1.Settings.credentials.token;
        if (!token) { Debug_1.Debug.write("[GatewayClient] No token \u2014 gateway disabled"); return; }
        const url = (resume && this._resumeUrl) ? this._resumeUrl : GATEWAY_URL;
        Debug_1.Debug.write(`[GatewayClient] Connecting... (resume=${resume}, url=${url})`);
        let ws;
        try { ws = new WebSocket(url); } catch (e) { Debug_1.Debug.write(`[GatewayClient] WS create failed: ${e.message}`); this._reconnecting = false; this._scheduleReconnect(5000, resume); return; } // CONN-04
        const instance = ++this._wsInstance;
        this._ws = ws;
        ws.on("message", data => {
            if (this._wsInstance !== instance) return;
            let msg; try { msg = JSON.parse(data); } catch { return; }
            if (msg.s != null) { this._seq = msg.s; _saveSession(token, this._sessionId, this._seq, this._resumeUrl); }
            switch (msg.op) {
                case 10: {
                    const interval = msg.d.heartbeat_interval;
                    this._startHB(interval);
                    if (resume && this._sessionId && this._seq != null) {
                        Debug_1.Debug.write("[GatewayClient] Sending RESUME");
                        this._send({ op: 6, d: { token, session_id: this._sessionId, seq: this._seq } });
                    } else {
                        this._identify(token);
                    }
                    break;
                }
                case 11: this._ackReceived = true; break;
                case 1:  this._send({ op: 1, d: this._seq }); break;
                case 0:
                    if (msg.t === "READY") {
                        this._sessionId = msg.d.session_id;
                        this._resumeUrl = msg.d.resume_gateway_url || GATEWAY_URL;
                        _saveSession(token, this._sessionId, this._seq, this._resumeUrl);
                        this.connected = true; this._connectedAt = Date.now();
                        this._reconnecting = false;
                        this._resetReconnectDelay();
                        Debug_1.Debug.write("[GatewayClient] Connected (READY)");
                        if (typeof this.onReady === "function") { try { this.onReady(); } catch(e) { Debug_1.Debug.write(`[GatewayClient] onReady callback error: ${e}`); } }
                    } else if (msg.t === "RESUMED") {
                        this.connected = true;
                        this._reconnecting = false;
                        this._resetReconnectDelay();
                        Debug_1.Debug.write("[GatewayClient] Resumed"); this._connectedAt = Date.now();
                        if (typeof this.onReady === "function") { try { this.onReady(); } catch(e) { Debug_1.Debug.write(`[GatewayClient] onReady callback error: ${e}`); } }
                    }
                    break;
                case 7:
                    Debug_1.Debug.write("[GatewayClient] Op 7 \u2014 reconnecting with resume");
                    this._reset(500, true);
                    break;
                case 9:
                    Debug_1.Debug.write(`[GatewayClient] Invalid session (resumable=${msg.d}) \u2014 reconnecting`);
                    if (!msg.d) { _clearSession(); this._sessionId = null; this._seq = null; this._resumeUrl = null; }
                    this._reset(1000 + Math.random() * 4000, !!msg.d);
                    break;
            }
        });
        ws.on("close", code => {
            if (this._wsInstance !== instance) return;
            this.connected = false; this._clearHB();
            if (this._destroyed) return;
            if (FATAL_CODES.has(code)) {
                const msg = FATAL_MESSAGES[code] || `Fatal gateway error (code ${code})`;
                process.stdout.write("\x1b[0m");
                console.error(`\x1b[31m[lyrics-status] Discord Gateway: ${msg}\x1b[0m`);
                Debug_1.Debug.write(`[GatewayClient] Fatal close ${code} \u2014 ${msg}`);
                return;
            }
            const canResume = !NO_RESUME_CODES.has(code);
            if (!canResume) { _clearSession(); this._sessionId = null; this._seq = null; this._resumeUrl = null; } // #13: discard stale session in memory on non-resumable close
            Debug_1.Debug.write(`[GatewayClient] Disconnected (${code}) \u2014 reconnecting in 5s (resume=${canResume})`);
            this._scheduleReconnect(5000, canResume);
        });
        ws.on("error", e => Debug_1.Debug.write(`[GatewayClient] WS error: ${e.message}`));
    }

    _identify(token) {
        const now = Date.now();
        if (now - this._lastIdentifyAt < 5000) {
            const wait = 5000 - (now - this._lastIdentifyAt);
            Debug_1.Debug.write(`[GatewayClient] Identify rate limit — waiting ${wait}ms`);
            const _inst = this._wsInstance; setTimeout(() => { if (!this._destroyed && this._wsInstance === _inst) this._identify(token); }, wait);
            return;
        }
        this._lastIdentifyAt = now;
        const pref = Settings_1.Settings.gateway?.presenceStatus || "online";
        const isMobile = pref === "mobile";
        const status = isMobile ? "online" : pref;
        const props = isMobile
            ? { os: "Android", browser: "Discord Android", device: "discord-android" }
            : { os: "Windows", browser: "Discord Client", device: "" };
        this._send({ op: 2, d: { token, properties: props, compress: false, intents: 0, presence: { status, afk: status === "idle", since: status === "idle" ? Date.now() : null, activities: [] } } });
    }
    _startHB(interval) {
        this._clearHB();
        this._ackReceived = true;
        const gen = ++this._hbGeneration;
        this._hbTimeout = setTimeout(() => {
            this._hbTimeout = null;
            if (this._hbGeneration !== gen) return;
            this._ackReceived = false;
            this._send({ op: 1, d: this._seq });
            this._hbInterval = setInterval(() => {
                if (!this._ackReceived) {
                    Debug_1.Debug.write("[GatewayClient] HB ACK missed \u2014 reconnecting");
                    this._reset(1000, true);
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
        let delay;
        if (ms != null) { delay = ms; } else { this._reconnectDelay = Math.min(this._reconnectDelay * 2, 60000); delay = this._reconnectDelay; }
        setTimeout(() => { this._reconnecting = false; if (!this._destroyed) this._open(canResume); }, delay);
    }
    _resetReconnectDelay() { this._reconnectDelay = 1000; }
    _send(payload) {
        if (this._ws?.readyState === WebSocket.OPEN) try { this._ws.send(JSON.stringify(payload)); } catch (e) { Debug_1.Debug.write(`[GatewayClient] Send error (op ${payload?.op ?? "?"}): ${e.message}`); }
    }

    flashPresence(status, text, emoji) {
        if (!this.connected) return false;
        this._flashStatus = status;
        let type4 = null;
        if (typeof text === "string" && text !== "") {
            type4 = { type: 4, name: "Custom Status", state: text, emoji: emoji ? { name: emoji } : null };
        } else if (text == null && this._lastActivity) {
            type4 = this._lastActivity;
        }
        const activities = [type4, this._lastRichPresenceActivity].filter(Boolean);
        this._send({ op: 3, d: { since: status === "idle" ? Date.now() : 0, afk: status === "idle", status, activities } });
        Debug_1.Debug.write("[GatewayClient] flashPresence " + status + " | " + (type4 ? type4.state : "none"));
        return true;
    }
    clearFlashStatus() { this._flashStatus = null; }
    clearLastActivity() { this._lastActivity = null; this._lastRichPresenceActivity = null; }

    setCustomStatus(text, emoji) {
        if (!this.connected) return false;
        const now = Date.now(); if (now - (this._connectedAt || 0) < 3000) { Debug_1.Debug.write(`[GatewayClient] post-READY hold`); return "hold"; }
        const minGwInterval = Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000;
        // RL-14: prune via circular buffer — count entries within 20s window
        let _pstActive = 0;
        for (let _i = 0; _i < this._pstCount; _i++) { const _t = this._pst[(this._pstHead - 1 - _i + 5) % 5]; if (now - _t <= 20000) _pstActive++; }
        if (minGwInterval > 0 && this._lastGwSentAt > 0 && now - this._lastGwSentAt < minGwInterval) { Debug_1.Debug.write("[GatewayClient] op3 min interval (" + minGwInterval + "ms) not elapsed \u2014 skipping"); return false; }
        if (_pstActive >= 5) { Debug_1.Debug.write(`[GatewayClient] op3 rate limit (5/20s) \u2014 skipping`); return false; }
        this._pst[this._pstHead] = now; this._pstHead = (this._pstHead + 1) % 5; this._pstCount = Math.min(this._pstCount + 1, 5); this._lastGwSentAt = now;
        const pref = Settings_1.Settings.gateway?.presenceStatus || "online";
        const status = this._flashStatus || (pref === 'mobile' ? 'online' : pref === 'off' ? 'online' : pref === 'invisible' ? 'invisible' : pref);
        const type4 = { type: 4, name: "Custom Status", state: text || "", emoji: emoji ? { name: emoji } : null };
        this._lastActivity = type4;
        const activities = [type4, this._lastRichPresenceActivity].filter(Boolean);
        this._send({ op: 3, d: { since: status === 'idle' ? now : 0, afk: status === 'idle', status, activities } });
        return true;
    }
}
exports.GatewayClient = GatewayClient;
