"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express = require("express");
const { createServer } = require("node:http");
const { WebSocketServer, WebSocket } = require("ws");
const { join } = require("node:path");
const { existsSync } = require("node:fs");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");
const Debug_1 = require("../Debug");

const STATIC = join(__dirname, "../../static");
const KEYS = ["credentials","view","timings","update","rateLimit","sources","chineseConversion","restore","gateway","statusFlash","richPresence"];

function refreshSpotifyWebToken() {
    const cookies = Settings_1.Settings.credentials.cookies;
    if (!cookies?.trim()) return;
    fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player", {
        headers: { "accept": "*/*", "accept-language": "en-US,en;q=0.9", "app-platform": "WebPlayer", "x-requested-with": "XMLHttpRequest", "cookie": cookies, "Referer": "https://open.spotify.com/", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36" }
    })
    .then(r => r.json())
    .then(j => {
        if (!j?.accessToken) { Debug_1.Debug.write("[SpotifyToken] Refresh failed: " + JSON.stringify(j).slice(0, 200)); setTimeout(refreshSpotifyWebToken, 60000); return; }
        const expiry = (j.accessTokenExpirationTimestampMs > Date.now()) ? j.accessTokenExpirationTimestampMs : Date.now() + 3600000;
        Settings_1.Settings.credentials.spotifyWebToken = j.accessToken;
        Settings_1.Settings.credentials.spotifyWebTokenExpiry = expiry;
        Settings_1.Settings.save();
        Debug_1.Debug.write("[SpotifyToken] Refreshed, expires " + new Date(expiry).toISOString());
        setTimeout(refreshSpotifyWebToken, Math.max(60000, expiry - Date.now() - 300000));
    })
    .catch(e => { Debug_1.Debug.write("[SpotifyToken] Error: " + e + " — retry in 60s"); setTimeout(refreshSpotifyWebToken, 60000); });
}

function startServer() {
    if (!existsSync(STATIC)) {
        console.error("\x1b[31m[lyrics-status] static/ directory not found at: " + STATIC + "\n  The panel UI will not load. Re-download the release zip.\x1b[0m");
        Debug_1.Debug.write("[Server] static/ directory missing: " + STATIC);
    }

    const app = express();
    const httpServer = createServer(app);
    const wss = new WebSocketServer({ server: httpServer, path: "/ws", maxPayload: 65536 });
    app.use("/", express.static(STATIC));
    app.get("/", (_, res) => res.sendFile(join(STATIC, "index.html")));
    app.get("/callback", (req, res) => {
        if (Settings_1.Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token) return res.sendStatus(401);
            Settings_1.Settings.credentials.refreshToken = req.query.refresh_token;
            Settings_1.Settings.save();
        } else {
            if (!req.query.code) return res.sendStatus(401);
            Settings_1.Settings.credentials.code = req.query.code;
            SpotifyService_1.SpotifyService.exchange().then(() => Settings_1.Settings.save()).catch(e => Debug_1.Debug.write(`[Server] exchange failed: ${e}`));
        }
        res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Authorized</title><script>(function(){try{if(window.opener&&!window.opener.closed)window.close();}catch(e){}})()</\script></head><body><p>Authorization complete. You can close this window.</p></body></html>`);
    });

    // Ping/pong heartbeat — terminates zombie panel connections
    const heartbeat = setInterval(() => {
        for (const ws of wss.clients) {
            if (!ws.isAlive) { ws.terminate(); continue; }
            ws.isAlive = false;
            ws.ping();
        }
    }, 30000);
    wss.on("close", () => clearInterval(heartbeat));

    wss.on("connection", ws => {
        ws.isAlive = true;
        ws.on("pong", () => { ws.isAlive = true; });
        ws.on("error", e => Debug_1.Debug.write(`[Server] WS error: ${e}`));
        ws.on("message", data => {
            let p; try { p = JSON.parse(data.toString()); } catch { return; }
            if (!p || typeof p !== "object") return;
            for (const k of KEYS) {
                if (p[k] == null) continue;
                if (typeof Settings_1.Settings[k] === "object" && !Array.isArray(Settings_1.Settings[k]) && typeof p[k] === "object") {
                    Settings_1.Settings[k] = { ...Settings_1.Settings[k], ...p[k] };
                    if (k === "view" && p[k].advanced) Settings_1.Settings[k].advanced = { ...Settings_1.Settings[k].advanced, ...p[k].advanced };
                } else {
                    Settings_1.Settings[k] = p[k];
                }
            }
            Settings_1.Settings.save();
        });
        const payload = JSON.stringify(Object.fromEntries(KEYS.map(k => [k, Settings_1.Settings[k]])));
        if (ws.readyState === WebSocket.OPEN) try { ws.send(payload); } catch (e) { Debug_1.Debug.write(`[Server] Send failed: ${e}`); }
    });

    httpServer.on("error", e => {
        if (e.code === "EADDRINUSE") {
            console.error("\x1b[31m[lyrics-status] Port 8999 is already in use.\n  Another instance may be running. Close it and try again.\x1b[0m");
            process.exit(1);
        }
        Debug_1.Debug.write("[Server] httpServer error: " + e.stack);
    });

    // Graceful shutdown
    function shutdown() {
        for (const ws of wss.clients) {
            try { ws.send(JSON.stringify({ type: "server_shutdown" })); } catch (_) {}
        }
        wss.close();
        httpServer.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 10000);
    }
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    httpServer.listen(8999);
    refreshSpotifyWebToken();
}
