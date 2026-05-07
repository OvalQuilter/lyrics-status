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
exports.LrcLibSource = void 0;
const BaseSource_1 = require("./BaseSource");
/**
 * Lyrics but using LrcLib
 * https://lrclib.net/api
 */
class LrcLibSource extends BaseSource_1.BaseSource {
    constructor() {
        super(...arguments);
        this.baseUrl = "https://lrclib.net/api";
    }
    getLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/get?track_name=${encodeURIComponent(name)}&artist_name=${encodeURIComponent(artist)}`);
            if (!response.ok)
                throw new Error(`Request failed: ${response.status}`);
            const json = (yield response.json());
            // Only if there are sync lyrics
            if (!json.syncedLyrics || !json.syncedLyrics.trim()) {
                // Retrun nothing (this should switch to the next one right?)
                throw new Error("No synced lyrics found");
            }
            return this.parseLyrics(json.syncedLyrics);
        });
    }
    /**
     * Convert the response to the .json format we use
     */
    parseLyrics(lyrics) {
        const result = { lines: [] };
        const lines = lyrics.split("\n");
        // it should be: [mm:ss.xx] text
        const regexp = /\[(\d\d):(\d\d)(?:\.(\d\d))?]/g;
        for (let line of lines) {
            if (!line.trim())
                continue;
            const timestamps = [];
            let match;
            while ((match = regexp.exec(line)) !== null) {
                const min = parseInt(match[1]);
                const sec = parseInt(match[2]);
                const ms = match[3] ? parseInt(match[3]) * 10 : 0;
                timestamps.push((min * 60 + sec) * 1000 + ms);
            }
            const text = line.replace(regexp, "").trim();
            if (!text)
                continue;
            for (const time of timestamps.length ? timestamps : [0]) {
                result.lines.push({ time, text });
            }
        }
        result.lines.sort((a, b) => a.time - b.time);
        return result;
    }
    getAppName() {
        return "LrcLib";
    }
}
exports.LrcLibSource = LrcLibSource;
