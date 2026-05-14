"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifySource = void 0;
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");

class SpotifySource {
    _req(url) {
        return fetch(url, {
            headers: {
                "accept": "application/json", "accept-language": "ru",
                "app-platform": "WebPlayer", "spotify-app-version": "1.2.40.176.g6d58cb73",
                "authorization": "Bearer " + SpotifyService_1.SpotifyService.getBearerToken(),
                "Cookie": Settings_1.Settings.credentials.cookies
            },
            referrer: "https://open.spotify.com/", referrerPolicy: "strict-origin-when-cross-origin", method: "GET"
        });
    }
    async getLyrics(name, artist, songId) {
        if (!songId) {
            const r = await this._req("https://api.spotify.com/v1/me/player");
            if (r.status === 401) {
                await SpotifyService_1.SpotifyService.refresh();
                const r2 = await this._req("https://api.spotify.com/v1/me/player");
                if (!r2.ok) throw new Error(`Spotify player HTTP ${r2.status}`);
                const j = await r2.json();
                if (!j?.item?.id) throw new Error("Spotify: no current track");
                songId = j.item.id;
            } else {
                if (!r.ok) throw new Error(`Spotify player HTTP ${r.status}`);
                const j = await r.json();
                if (!j?.item?.id) throw new Error("Spotify: no current track");
                songId = j.item.id;
            }
        }
        let r = await this._req(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`);
        if (r.status === 401) {
            await SpotifyService_1.SpotifyService.refresh();
            r = await this._req(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`);
        }
        if (!r.ok) throw new Error(`Spotify lyrics HTTP ${r.status}`);
        const j = await r.json();
        if (!j?.lyrics) throw new Error("Spotify: no lyrics object");
        if (j.lyrics.showUpsell) throw new Error("Spotify: requires premium");
        if (j.lyrics.syncType === "UNSYNCED") throw new Error("Spotify: unsynced only");
        if (!j.lyrics.lines?.length) throw new Error("Spotify: empty lines");
        return { lines: j.lyrics.lines.map(l => ({ time: +l.startTimeMs, text: l.words })) };
    }
    getAppName() { return "Spotify"; }
}
exports.SpotifySource = SpotifySource;
