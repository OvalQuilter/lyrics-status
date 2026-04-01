"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyService = void 0;
const Settings_1 = require("./Settings");

class SpotifyService {
    static async exchange() {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            headers: {
                "Authorization": `Basic ${Buffer.from(`${Settings_1.Settings.credentials.clientID}:${Settings_1.Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                client_id: Settings_1.Settings.credentials.clientID,
                grant_type: "authorization_code",
                code: Settings_1.Settings.credentials.code,
                redirect_uri: Settings_1.Settings.credentials.customRedirectUri
            }).toString(),
            method: "POST"
        });
        if (!request.ok) return;
        const json = await request.json();
        this.token = json.access_token;
        Settings_1.Settings.credentials.refreshToken = json.refresh_token;
    }
    static async refresh() {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            headers: {
                "Authorization": `Basic ${Buffer.from(`${Settings_1.Settings.credentials.clientID}:${Settings_1.Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: Settings_1.Settings.credentials.refreshToken,
                redirect_uri: Settings_1.Settings.credentials.customRedirectUri
            }).toString(),
            method: "POST"
        });
        if (!request.ok) return;
        const json = await request.json();
        this.token = json.access_token;
        if (json.refresh_token) Settings_1.Settings.credentials.refreshToken = json.refresh_token;
    }
}
exports.SpotifyService = SpotifyService;
SpotifyService.token = "";
