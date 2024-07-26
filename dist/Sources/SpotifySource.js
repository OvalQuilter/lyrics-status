"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifySource = void 0;
const BaseSource_1 = require("./BaseSource");
const SpotifyAccessToken_1 = require("../SpotifyAccessToken");
const Settings_1 = require("../Settings");
class SpotifySource extends BaseSource_1.BaseSource {
    request(url) {
        return fetch(url, {
            "headers": {
                "accept": "application/json",
                "accept-language": "ru",
                "app-platform": "WebPlayer",
                "authorization": "Bearer " + SpotifyAccessToken_1.SpotifyAccessToken,
                "spotify-app-version": "1.2.40.176.g6d58cb73",
                "Cookie": Settings_1.Settings.credentials.cookies
            },
            "referrer": "https://open.spotify.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
        });
    }
    getSongId() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.request("https://api.spotify.com/v1/me/player");
            const json = yield request.json();
            return json.item.id;
        });
    }
    getLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const songId = yield this.getSongId();
            const request = yield this.request(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`);
            const json = yield request.json();
            if (json.lyrics.showUpsell || json.lyrics.syncType === "UNSYNCED")
                throw "Lyrics not found";
            return this.parseLyrics(json.lyrics.lines);
        });
    }
    parseLyrics(lines) {
        const result = {
            lines: []
        };
        for (const line of lines) {
            result.lines.push({
                time: +line.startTimeMs,
                text: line.words
            });
        }
        return result;
    }
    getAppName() {
        return "Spotify";
    }
}
exports.SpotifySource = SpotifySource;
