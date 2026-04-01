"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifySource = void 0;
const BaseSource_1 = require("./BaseSource");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");

class SpotifySource extends BaseSource_1.BaseSource {
    getBearerToken() {
        const wt = Settings_1.Settings.credentials.spotifyWebToken;
        if (wt && typeof wt === "string" && wt.trim().length > 0) return wt;
        return SpotifyService_1.SpotifyService.token;
    }
    request(url) {
        return fetch(url, {
            headers: {
                "accept": "application/json",
                "accept-language": "ru",
                "app-platform": "WebPlayer",
                "authorization": "Bearer " + this.getBearerToken(),
                "spotify-app-version": "1.2.40.176.g6d58cb73",
                "Cookie": Settings_1.Settings.credentials.cookies
            },
            referrer: "https://open.spotify.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
        });
    }
    async getLyrics(name, artist) {
        const playerRes = await this.request("https://api.spotify.com/v1/me/player");
        if (!playerRes.ok) throw new Error(`Spotify player HTTP ${playerRes.status}`);
        const playerJson = await playerRes.json();
        if (!playerJson || !playerJson.item || !playerJson.item.id)
            throw new Error("Spotify: no current track in player response");
        const songId = playerJson.item.id;
        const lyricsRes = await this.request(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`);
        if (!lyricsRes.ok) throw new Error(`Spotify lyrics HTTP ${lyricsRes.status}`);
        const json = await lyricsRes.json();
        if (!json || !json.lyrics) throw new Error("Spotify: no lyrics object in response");
        if (json.lyrics.showUpsell) throw new Error("Spotify: lyrics require premium (showUpsell)");
        if (json.lyrics.syncType === "UNSYNCED") throw new Error("Spotify: only unsynced lyrics available");
        if (!json.lyrics.lines || json.lyrics.lines.length === 0) throw new Error("Spotify: empty lyrics lines");
        return this.parseLyrics(json.lyrics.lines);
    }
    parseLyrics(lines) {
        const result = { lines: [] };
        for (const line of lines) {
            result.lines.push({ time: +line.startTimeMs, text: line.words });
        }
        return result;
    }
    getAppName() { return "Spotify"; }
}
exports.SpotifySource = SpotifySource;
