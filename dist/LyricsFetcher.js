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
exports.LyricsFetcher = void 0;
const fs_1 = require("fs");
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");
let _opencc = null;
let _openccMode = null;
let _toTraditional = null;
let _toSimplified = null;
function getConverter(mode) {
    if (mode === "off") return null;
    try {
        if (!_opencc) _opencc = require("opencc-js");
        if (mode === "toTraditional") {
            if (!_toTraditional) _toTraditional = _opencc.Converter({ from: "cn", to: "tw" });
            return _toTraditional;
        }
        if (mode === "toSimplified") {
            if (!_toSimplified) _toSimplified = _opencc.Converter({ from: "tw", to: "cn" });
            return _toSimplified;
        }
    } catch (e) {
        Debug_1.Debug.write("[LyricsFetcher] opencc-js not available: " + e);
    }
    return null;
}
function applyConversion(lyrics) {
    const mode = Settings_1.Settings.chineseConversion || "off";
    if (mode === "off" || !lyrics || !Array.isArray(lyrics.lines)) return lyrics;
    const convert = getConverter(mode);
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
    fetchLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastFetchedFrom = "Not fetched";
            const cache = this.fetchCachedLyrics(name, artist);
            let result = cache;
            for (const source of this.sources) {
                if (cache) {
                    this.lastFetchedFor = name + artist;
                    this.lastFetchedFrom = `Cache (${cache.appName})`;
                    result = applyConversion(cache);
                    break;
                }
                try {
                    this.lastFetchedFor = name + artist;
                    result = yield source.getLyrics(name, artist);
                    this.lastFetchedFrom = source.getAppName();
                }
                catch (_a) {
                    Debug_1.Debug.write(`[LyricsFetcher] ${source.getAppName()} failed: ${_a}`);
                }
                // Cache write is separate so a filesystem error (e.g. invalid chars in
                // song name on Windows) never masks a successful lyrics fetch.
                if (result) result = applyConversion(result);
                if (result && !cache) {
                    try { this.cacheLyrics(name, artist, result, this.lastFetchedFrom); }
                    catch (_b) { Debug_1.Debug.write(`[LyricsFetcher] Cache write failed for "${name}": ${_b}`); }
                }
                if (result)
                    break;
            }
            return result;
        });
    }
    fetchCachedLyrics(name, artist) {
        const path = `./cache/${name}-${artist}.json`;
        let lyrics = null;
        try {
            lyrics = JSON.parse((0, fs_1.readFileSync)(path).toString());
        }
        catch (_a) { }
        return lyrics;
    }
    cacheLyrics(name, artist, lyrics, appName) {
        if (!(0, fs_1.existsSync)("./cache"))
            (0, fs_1.mkdirSync)("./cache");
        (0, fs_1.writeFileSync)(`./cache/${name}-${artist}.json`, JSON.stringify(Object.assign(Object.assign({}, lyrics), { appName })));
    }
}
exports.LyricsFetcher = LyricsFetcher;
