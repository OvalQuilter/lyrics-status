"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifySource = void 0;
const BaseSource_1 = require("./BaseSource");
const Settings_1 = require("../Settings");
const SpotifyService_1 = require("../SpotifyService");
class SpotifySource extends BaseSource_1.BaseSource {
    request(url) {
        return fetch(url, {
            "headers": {
                "accept": "application/json",
                "accept-language": "ru",
                "app-platform": "WebPlayer",
                "authorization": "Bearer " + SpotifyService_1.SpotifyService.token,
                "spotify-app-version": "1.2.40.176.g6d58cb73",
                "Cookie": Settings_1.Settings.credentials.cookies
            },
            "referrer": "https://open.spotify.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
        });
    }
    async getSongId() {
        const request = await this.request("https://api.spotify.com/v1/me/player");
        const json = await request.json();
        return json.item.id;
    }
    async getLyrics(name, artist) {
        const songId = await this.getSongId();
        const request = await this.request(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`);
        const json = await request.json();
        if (json.lyrics.showUpsell || json.lyrics.syncType === "UNSYNCED")
            throw "Lyrics not found";
        return this.parseLyrics(json.lyrics.lines);
    }
    parseLyrics(lines) {
        const result = {
            lines: []
        };
        for (const line of lines) {
            const lineStart = +line.startTimeMs;
            const lineEnd = line.endTimeMs ? +line.endTimeMs : undefined;
            const wordTimings = this.parseWordTimings(line, lineStart);
            result.lines.push({
                time: lineStart,
                text: line.words,
                endTime: Number.isFinite(lineEnd) ? lineEnd : undefined,
                words: wordTimings
            });
        }
        return result;
    }
    parseWordTimings(line, lineStart) {
        const syllables = line.syllables;
        if (!Array.isArray(syllables) || syllables.length === 0)
            return undefined;
        const words = [];
        for (const syl of syllables) {
            if (typeof syl !== "object" || !syl)
                continue;
            const textValue = syl["text"] ?? syl["word"];
            const rawText = typeof textValue === "string" ? textValue.trim() : (textValue != null ? String(textValue).trim() : "");
            if (!rawText)
                continue;
            const startValue = syl["startTimeMs"] ?? syl["startTime"];
            const rawStart = typeof startValue === "number" || typeof startValue === "string" ? Number(startValue) : NaN;
            if (!Number.isFinite(rawStart))
                continue;
            const endValue = syl["endTimeMs"] ?? syl["endTime"];
            const rawEnd = typeof endValue === "number" || typeof endValue === "string" ? Number(endValue) : NaN;
            const startTime = (rawStart < lineStart - 1000 && lineStart > 0) ? (lineStart + rawStart) : rawStart;
            const endTime = Number.isFinite(rawEnd)
                ? ((rawEnd < lineStart - 1000 && lineStart > 0) ? (lineStart + rawEnd) : rawEnd)
                : undefined;
            words.push({ startTime, endTime, text: rawText });
        }
        return words.length ? words : undefined;
    }
    getAppName() {
        return "Spotify";
    }
}
exports.SpotifySource = SpotifySource;
