"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCompleteCallback = setAuthCompleteCallback;
exports.startServer = startServer;
exports.stopServer = stopServer;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const ws_1 = require("ws");
const node_path_1 = require("node:path");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");
let httpServer = null;
let wss = null;
// Event emitter for auth completion - will be set by main.ts
let onAuthComplete = null;
function setAuthCompleteCallback(callback) {
    onAuthComplete = callback;
}
function startServer() {
    const app = (0, express_1.default)();
    httpServer = (0, node_http_1.createServer)(app);
    wss = new ws_1.WebSocketServer({
        server: httpServer,
        path: "/ws"
    });
    app.use("/", express_1.default.static((0, node_path_1.join)(__dirname, "../../static")));
    app.get("/", (req, res) => {
        res.sendFile((0, node_path_1.join)(__dirname, "../../static/index.html"));
    });
    app.get("/callback", async (req, res) => {
        if (Settings_1.Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token)
                return res.sendStatus(401);
            const refreshToken = req.query.refresh_token;
            console.log("External auth refresh token received:", refreshToken);
            Settings_1.Settings.credentials.refreshToken = refreshToken;
            Settings_1.Settings.save();
            console.log("Settings saved with refresh token");
        }
        else {
            if (!req.query.code)
                return res.sendStatus(401);
            const code = req.query.code;
            Settings_1.Settings.credentials.code = code;
            console.log("Authorization code received, exchanging...");
            await SpotifyService_1.SpotifyService.exchange();
            console.log("Token exchanged, refresh token:", Settings_1.Settings.credentials.refreshToken ? "present" : "missing");
            // exchange() now calls Settings.save() internally
        }
        // Notify that auth is complete
        if (onAuthComplete) {
            onAuthComplete();
        }
        res.send("<html><body><h1>Success!</h1><p>Spotify connected! You can close this page now.</p><script>window.close();</script></body></html>");
    });
    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const settings = JSON.parse(data.toString());
            // Not typed but it's necessary
            Settings_1.Settings.credentials = settings.credentials;
            Settings_1.Settings.view = settings.view;
            Settings_1.Settings.timings = settings.timings;
            Settings_1.Settings.update = settings.update;
            Settings_1.Settings.save();
        });
        const settings = JSON.stringify({
            credentials: Settings_1.Settings.credentials,
            view: Settings_1.Settings.view,
            timings: Settings_1.Settings.timings,
            update: Settings_1.Settings.update
        });
        ws.send(settings);
    });
    httpServer.listen(67, "127.0.0.1", () => {
        console.log("Server started on http://127.0.0.1:67");
    });
    httpServer.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error("Port 67 is already in use. Trying port 6700...");
            httpServer?.listen(6700, "127.0.0.1", () => {
                console.log("Server started on http://127.0.0.1:6700");
            });
        }
        else if (err.code === "EACCES") {
            console.error("Port 67 requires elevated privileges. Trying port 6700...");
            httpServer?.listen(6700, "127.0.0.1", () => {
                console.log("Server started on http://127.0.0.1:6700");
            });
        }
        else {
            console.error("Server error:", err);
        }
    });
}
function stopServer() {
    if (wss) {
        // Close all WebSocket connections
        wss.clients.forEach((client) => {
            client.terminate();
        });
        wss.close();
        wss = null;
    }
    if (httpServer) {
        // Close all connections and stop listening
        httpServer.closeAllConnections();
        httpServer.close();
        httpServer = null;
    }
}
