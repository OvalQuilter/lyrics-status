"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express = require("express");
const { createServer } = require("node:http");
const { WebSocketServer, WebSocket } = require("ws");
const { join } = require("node:path");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");
const Debug_1 = require("../Debug");

const STATIC = join(__dirname, "../../static");
const KEYS = ["credentials","view","timings","update","rateLimit","sources","chineseConversion","restore","gateway"];

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
    const app = express();
    const httpServer = createServer(app);
    const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
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
    wss.on("connection", ws => {
        ws.on("error", e => Debug_1.Debug.write(`[Server] WS error: ${e}`));
        ws.on("message", data => {
            let p; try { p = JSON.parse(data.toString()); } catch { return; }
            if (!p || typeof p !== "object") return;
            // Bug 10 fix: deep-merge all object keys so partial panel updates don't nuke nested props
            for (const k of KEYS) {
                if (p[k] == null) continue;
                if (typeof Settings_1.Settings[k] === "object" && !Array.isArray(Settings_1.Settings[k]) && typeof p[k] === "object") {
                    Settings_1.Settings[k] = { ...Settings_1.Settings[k], ...p[k] };
                    // view.advanced needs a second level merge
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
    httpServer.listen(8999);
    refreshSpotifyWebToken();
}
