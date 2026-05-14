"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsFetcher = void 0;
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { readFile } = require("fs/promises");
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");

const sanitize = s => s.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_");
const cachePath = (name, artist) => `./cache/${sanitize(name)}-${sanitize(artist)}.json`;

let _opencc = null;
const getConverter = async (mode) => {
    if (mode === "off") return null;
    if (!_opencc) _opencc = await import("opencc-js").catch(e => { Debug_1.Debug.write("[LyricsFetcher] opencc-js failed: " + e); return null; });
    if (!_opencc) return null;
    try { return _opencc.Converter(mode === "toTraditional" ? { from: "cn", to: "tw" } : { from: "tw", to: "cn" }); }
    catch (e) { Debug_1.Debug.write("[LyricsFetcher] Converter init failed: " + e); return null; }
};

const applyConversion = async (lyrics) => {
    const mode = Settings_1.Settings.chineseConversion || "off";
    if (mode === "off" || !lyrics?.lines) return lyrics;
    const convert = await getConverter(mode);
    if (!convert) return lyrics;
    try { return { ...lyrics, lines: lyrics.lines.map(l => ({ ...l, text: convert(l.text || "") })) }; }
    catch (e) { Debug_1.Debug.write("[LyricsFetcher] Conversion error: " + e); return lyrics; }
};

class LyricsFetcher {
    constructor() { this.sources = []; this.lastFetchedFrom = "Not fetched"; this.lastFetchedFor = ""; this.lastAttemptedFor = ""; }
    addSource(source) { this.sources.push(source); }
    async fetchLyrics(name, artist, songId) {
        this.lastFetchedFrom = "Not fetched";
        const key = name + artist;
        this.lastAttemptedFor = key;
        try {
            const data = await readFile(cachePath(name, artist), "utf8");
            const cache = JSON.parse(data);
            this.lastFetchedFor = key;
            this.lastFetchedFrom = `Cache (${cache.appName})`;
            return await applyConversion(cache);
        } catch (_) {}
        let result = null;
        for (const source of this.sources) {
            try { result = await source.getLyrics(name, artist, songId); this.lastFetchedFrom = source.getAppName(); }
            catch (e) { Debug_1.Debug.write(`[LyricsFetcher] ${source.getAppName()} failed: ${e}`); }
            if (result) {
                try { if (!existsSync("./cache")) mkdirSync("./cache"); writeFileSync(cachePath(name, artist), JSON.stringify({ ...result, appName: this.lastFetchedFrom })); }
                catch (e) { Debug_1.Debug.write(`[LyricsFetcher] Cache write failed: ${e}`); }
                result = await applyConversion(result);
                this.lastFetchedFor = key;
                break;
            }
        }
        // If all sources failed, clear lastAttemptedFor so the next poll retries
        if (!result) this.lastAttemptedFor = "";
        return result;
    }
}
exports.LyricsFetcher = LyricsFetcher;
