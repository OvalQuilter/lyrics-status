"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const ws_1 = require("ws");
const node_path_1 = require("node:path");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");
const Debug_1 = require("../Debug");
// Fetches a Spotify web player token using stored sp_dc cookies.
// Called at startup and refreshed automatically before expiry.
function refreshSpotifyWebToken() {
    const cookies = Settings_1.Settings.credentials.cookies;
    if (!cookies || !cookies.trim()) return;
    fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player", {
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "app-platform": "WebPlayer",
            "x-requested-with": "XMLHttpRequest",
            "cookie": cookies,
            "Referer": "https://open.spotify.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
        }
    })
    .then(r => r.json())
    .then(j => {
        const token = j && j.accessToken;
        if (!token || typeof token !== "string") {
            Debug_1.Debug.write("[SpotifyToken] Auto-refresh failed: no accessToken in response: " + JSON.stringify(j).slice(0, 200));
            return;
        }
        const expiry = (typeof j.accessTokenExpirationTimestampMs === "number" && j.accessTokenExpirationTimestampMs > Date.now())
            ? j.accessTokenExpirationTimestampMs
            : Date.now() + 3600000;
        Settings_1.Settings.credentials.spotifyWebToken = token;
        Settings_1.Settings.credentials.spotifyWebTokenExpiry = expiry;
        Settings_1.Settings.save();
        Debug_1.Debug.write("[SpotifyToken] Auto-refreshed web token, expires " + new Date(expiry).toISOString());
        // Schedule next refresh 5 minutes before expiry
        const refreshIn = Math.max(60000, expiry - Date.now() - 300000);
        setTimeout(refreshSpotifyWebToken, refreshIn);
    })
    .catch(e => {
        Debug_1.Debug.write("[SpotifyToken] Auto-refresh error: " + e + " — will retry in 60s");
        setTimeout(refreshSpotifyWebToken, 60000);
    });
}

function startServer() {
    const app = (0, express_1.default)();
    const httpServer = (0, node_http_1.createServer)(app);
    const wss = new ws_1.WebSocketServer({
        server: httpServer,
        path: "/ws"
    });
    app.use("/", express_1.default.static((0, node_path_1.join)(__dirname, "../../static")));
    app.get("/", (req, res) => {
        res.sendFile((0, node_path_1.join)(__dirname, "../../static/index.html"));
    });

    // Proxy: validates Musixmatch token server-side (browsers cannot set Cookie header).
    app.get("/check-mxm", (req, res) => {
        const token = Settings_1.Settings.credentials.musixmatchToken;
        if (!token) { res.json({ ok: false }); return; }
        const url = "https://apic-desktop.musixmatch.com/ws/1.1/token.get?app_id=web-desktop-app-v1.0&usertoken=" + encodeURIComponent(token);
        fetch(url, { headers: { "cookie": "x-mxm-token-guid=" + token, "authority": "apic-desktop.musixmatch.com" } })
        .then(r => r.json()).then(j => {
            const ok = !!(j && j.message && j.message.header && j.message.header.status_code === 200);
            Debug_1.Debug.write("[Server] Musixmatch token check: ok=" + ok);
            res.json({ ok });
        }).catch(() => res.json({ ok: false }));
    });
    app.get("/callback", (req, res) => {
        if (Settings_1.Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token) return res.sendStatus(401);
            const refreshToken = req.query.refresh_token;
            Debug_1.Debug.write(`[Server] OAuth callback: received refresh token`);
            Settings_1.Settings.credentials.refreshToken = refreshToken;
            Settings_1.Settings.save();
        } else {
            if (!req.query.code) return res.sendStatus(401);
            const code = req.query.code;
            Settings_1.Settings.credentials.code = code;
            // FIX: catch exchange failures so a bad OAuth response doesn't cause an
            // unhandled promise rejection that reaches the process-level error handler
            SpotifyService_1.SpotifyService.exchange()
                .then(() => Settings_1.Settings.save())
                .catch((e) => Debug_1.Debug.write(`[Server] SpotifyService.exchange failed: ${e}`));
        }
        res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Spotify authorization complete</title>
        <script>
            (function () {
                try {
                    if (window.opener && !window.opener.closed) {
                        window.close();
                    }
                } catch (e) {}
            })();
        </script>
    </head>
    <body>
        <p>Authorization complete. This window should close automatically. If it doesn't, you can close it now.</p>
    </body>
    </html>`);
    });
    wss.on("connection", (ws) => {
        // FIX: per-connection error handler — an ECONNRESET or similar on one client
        // previously had no handler and would propagate to the process-level handler
        ws.on("error", (err) => {
            Debug_1.Debug.write(`[Server] WebSocket client error: ${err}`);
        });
        ws.on("message", (data) => {
            // FIX: wrap JSON.parse in try/catch — a malformed payload previously threw
            // an uncaught exception that reached the process-level error handler
            let parsed;
            try {
                parsed = JSON.parse(data.toString());
            } catch (e) {
                Debug_1.Debug.write(`[Server] Received malformed JSON from panel, ignoring: ${e}`);
                return;
            }
            if (!parsed || typeof parsed !== "object") return;
            Settings_1.Settings.credentials = parsed.credentials ?? Settings_1.Settings.credentials;
            Settings_1.Settings.view        = parsed.view        ?? Settings_1.Settings.view;
            Settings_1.Settings.timings     = parsed.timings     ?? Settings_1.Settings.timings;
            Settings_1.Settings.update      = parsed.update      ?? Settings_1.Settings.update;
            if (parsed.rateLimit) Settings_1.Settings.rateLimit = parsed.rateLimit;
            if (parsed.sources)   Settings_1.Settings.sources   = parsed.sources;
            Settings_1.Settings.save();
        });
        const payload = JSON.stringify({
            credentials: Settings_1.Settings.credentials,
            view:        Settings_1.Settings.view,
            timings:     Settings_1.Settings.timings,
            update:      Settings_1.Settings.update,
            rateLimit:   Settings_1.Settings.rateLimit,
            sources:     Settings_1.Settings.sources
        });
        // FIX: check socket is still open before sending initial settings payload
        // (connection could theoretically close in the same event-loop tick it opens)
        if (ws.readyState === ws_1.WebSocket.OPEN) {
            ws.send(payload);
        }
    });
    httpServer.listen(8999);
    refreshSpotifyWebToken();
}
