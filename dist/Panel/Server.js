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
    app.get("/callback", (req, res) => {
        if (Settings_1.Settings.credentials.useExternalAuthServer) {
            if (!req.query.refresh_token)
                return res.sendStatus(401);
            const refreshToken = req.query.refresh_token;
            console.log(refreshToken);
            Settings_1.Settings.credentials.refreshToken = refreshToken;
            Settings_1.Settings.save();
        }
        else {
            if (!req.query.code)
                return res.sendStatus(401);
            const code = req.query.code;
            Settings_1.Settings.credentials.code = code;
            SpotifyService_1.SpotifyService.exchange().then(() => Settings_1.Settings.save());
        }
        res.send("OK. You can close this page now.");
    });
    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const settings = JSON.parse(data.toString());
            // Not typed but it's necessary
            Settings_1.Settings.credentials = settings.credentials;
            Settings_1.Settings.view = settings.view;
            Settings_1.Settings.translation = settings.translation,
                Settings_1.Settings.timings = settings.timings;
            Settings_1.Settings.update = settings.update;
            Settings_1.Settings.save();
        });
        const settings = JSON.stringify({
            credentials: Settings_1.Settings.credentials,
            view: Settings_1.Settings.view,
            translation: Settings_1.Settings.translation,
            timings: Settings_1.Settings.timings,
            update: Settings_1.Settings.update
        });
        ws.send(settings);
    });
    httpServer.listen(8999);
}
