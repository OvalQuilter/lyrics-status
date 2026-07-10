"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyService = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug"); // CONN-09

const _tokenReq = (params) => fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        "Authorization": `Basic ${Buffer.from(`${Settings_1.Settings.credentials.clientID}:${Settings_1.Settings.credentials.clientSecret}`).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(params).toString()
});

class SpotifyService {
    static getBearerToken() {
        const { spotifyWebToken: wt, spotifyWebTokenExpiry: exp } = Settings_1.Settings.credentials;
        return (wt && Date.now() < (exp || 0)) ? wt : SpotifyService.token;
    }
    static async exchange() {
        const r = await _tokenReq({ client_id: Settings_1.Settings.credentials.clientID, grant_type: "authorization_code", code: Settings_1.Settings.credentials.code, redirect_uri: Settings_1.Settings.credentials.customRedirectUri });
        if (!r.ok) { Debug_1.Debug.write("[SpotifyService] exchange HTTP " + r.status); return; }
        const j = await r.json();
        this.token = j.access_token;
        // Bug 11 fix: track OAuth token expiry
        if (j.expires_in) Settings_1.Settings.credentials.oauthTokenExpiry = Date.now() + j.expires_in * 1000;
        Settings_1.Settings.credentials.refreshToken = j.refresh_token;
        Settings_1.Settings.save();
    }
    static async refresh() {
        if (!Settings_1.Settings.credentials.refreshToken) return;
        const r = await _tokenReq({ grant_type: "refresh_token", refresh_token: Settings_1.Settings.credentials.refreshToken, redirect_uri: Settings_1.Settings.credentials.customRedirectUri });
        if (!r.ok) { Debug_1.Debug.write("[SpotifyService] refresh HTTP " + r.status); return; }
        const j = await r.json();
        this.token = j.access_token;
        // Bug 11 fix: track OAuth token expiry
        if (j.expires_in) Settings_1.Settings.credentials.oauthTokenExpiry = Date.now() + j.expires_in * 1000;
        if (j.refresh_token) Settings_1.Settings.credentials.refreshToken = j.refresh_token;
        Settings_1.Settings.save();
    }
}
exports.SpotifyService = SpotifyService;
SpotifyService.token = "";
