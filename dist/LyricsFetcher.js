"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsFetcher = void 0;
const fs_1 = require("fs");
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");

let _openccPromise = null;
let _toTraditional = null;
let _toSimplified = null;

function getOpencc() {
    if (!_openccPromise) {
        _openccPromise = import("opencc-js").catch(e => {
            Debug_1.Debug.write("[LyricsFetcher] opencc-js failed to load: " + e);
            return null;
        });
    }
    return _openccPromise;
}

async function getConverter(mode) {
    if (mode === "off") return null;
    const opencc = await getOpencc();
    if (!opencc) return null;
    try {
        if (mode === "toTraditional") {
            if (!_toTraditional) _toTraditional = opencc.Converter({ from: "cn", to: "tw" });
            return _toTraditional;
        }
        if (mode === "toSimplified") {
            if (!_toSimplified) _toSimplified = opencc.Converter({ from: "tw", to: "cn" });
            return _toSimplified;
        }
    } catch (e) {
        Debug_1.Debug.write("[LyricsFetcher] opencc-js Converter init failed: " + e);
    }
    return null;
}

async function applyConversion(lyrics) {
    const mode = Settings_1.Settings.chineseConversion || "off";
    if (mode === "off" || !lyrics || !Array.isArray(lyrics.lines)) return lyrics;
    const convert = await getConverter(mode);
    if (!convert) return lyrics;
    try {
        return { ...lyrics, lines: lyrics.lines.map(l => ({ ...l, text: convert(l.text || "") })) };
    } catch (e) {
        Debug_1.Debug.write("[LyricsFetcher] Conversion error: " + e);
        return lyrics;
    }
}

class LyricsFetcher {
    constructor() {
        this.sources = [];
        this.lastFetchedFrom = "Not fetched";
        this.lastFetchedFor = "";
    }
    addSource(source) {
        this.sources.push(source);
    }
    async fetchLyrics(name, artist) {
        this.lastFetchedFrom = "Not fetched";
        const cache = this.fetchCachedLyrics(name, artist);
        let result = cache;
        for (const source of this.sources) {
            if (cache) {
                this.lastFetchedFor = name + artist;
                this.lastFetchedFrom = `Cache (${cache.appName})`;
                result = await applyConversion(cache);
                break;
            }
            try {
                this.lastFetchedFor = name + artist;
                result = await source.getLyrics(name, artist);
                this.lastFetchedFrom = source.getAppName();
            } catch (_a) {
                Debug_1.Debug.write(`[LyricsFetcher] ${source.getAppName()} failed: ${_a}`);
            }
            if (result && !cache) {
                try { this.cacheLyrics(name, artist, result, this.lastFetchedFrom); }
                catch (_b) { Debug_1.Debug.write(`[LyricsFetcher] Cache write failed for "${name}": ${_b}`); }
            }
            if (result) result = await applyConversion(result);
            if (result) break;
        }
        return result;
    }
    fetchCachedLyrics(name, artist) {
        const path = `./cache/${name}-${artist}.json`;
        let lyrics = null;
        try {
            lyrics = JSON.parse((0, fs_1.readFileSync)(path).toString());
        } catch (_a) {}
        return lyrics;
    }
    cacheLyrics(name, artist, lyrics, appName) {
        if (!(0, fs_1.existsSync)("./cache"))
            (0, fs_1.mkdirSync)("./cache");
        (0, fs_1.writeFileSync)(`./cache/${name}-${artist}.json`, JSON.stringify(Object.assign(Object.assign({}, lyrics), { appName })));
    }
}
exports.LyricsFetcher = LyricsFetcher;
