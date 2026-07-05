"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsFetcher = void 0;
const Debug_1 = require("./Debug");
const Settings_1 = require("./Settings");
const CacheStore_1 = require("./CacheStore");

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
    constructor(cache) {
        this.sources = [];
        this.cache = cache;
        this.lastFetchedFrom = "Not fetched";
        this.lastFetchedFor = "";
        this.lastAttemptedFor = "";
        this._inFlight = new Map();
        this._lyricsRefCache = new Map(); // key -> stable lyrics reference for object-identity stability
    }

    addSource(source) { this.sources.push(source); }

    async fetchLyrics(name, artist, songId) {
        if (!name || !artist) return null;

        const key = (0, CacheStore_1.cacheKey)(name, artist);

        // In-flight check before cache — prevents double-fetch on concurrent polls
        if (this._inFlight.has(key)) return this._inFlight.get(key);

        const cached = this.cache.get(name, artist);
        if (cached !== null) {
            this.lastFetchedFor = `${name}\0${artist}`;
            this.lastAttemptedFor = `${name}\0${artist}`;
            if (!cached.lines) {
                this.lastFetchedFrom = "None"; // CONN-38: show "None" instead of stale source
                return null;
            }
            this.lastFetchedFrom = `Cache (${cached.appName})`;
            // Return stable object reference so sentLines Set identity checks remain valid
            // across repeated fetchLyrics calls for the same song (e.g. retries mid-song)
            if (this._lyricsRefCache.has(key)) return this._lyricsRefCache.get(key);
            const _cacheResult = await applyConversion({ lines: cached.lines });
            this._lyricsRefCache.set(key, _cacheResult);
            return _cacheResult;
        }

        // Cache miss — reset lastAttemptedFor so PlaybackStateUpdater can retry if needed
        this.lastAttemptedFor = "";

        const p = this._doFetch(name, artist, songId);
        this._inFlight.set(key, p);
        p.finally(() => this._inFlight.delete(key));
        return p;
    }

    async _doFetch(name, artist, songId) {
        if (!this._skip) this._skip = new Map();
        let result = null;
        let appName = "none";
        let hadNetworkError = false;

        const now = Date.now();
        const results = await Promise.all(this.sources.map(async source => {
            const until = this._skip.get(source);
            if (until && until > now) return null;
            try {
                const r = await source.getLyrics(name, artist, songId);
                return { source, r };
            } catch (e) {
                Debug_1.Debug.write(`[LyricsFetcher] ${source.getAppName()} failed: ${e}`);
                hadNetworkError = true;
                if (/429|rate.?limit/i.test(String(e))) this._skip.set(source, Date.now() + 60000);
                return null;
            }
        }));

        let fallback = null;
        for (const entry of results) {
            if (!entry?.r?.lines?.length) continue;
            if (!fallback) { fallback = entry; }
            if (entry.r.lines.some(l => l.time > 0)) { result = entry.r; appName = entry.source.getAppName(); break; }
        }
        if (!result && fallback) { result = fallback.r; appName = fallback.source.getAppName(); }

        const error = !result ? (hadNetworkError ? "network" : "no_results") : undefined; // CONN-39: no_results avoids permanent cache on clean miss
        this.cache.set(name, artist, result?.lines ?? null, appName, error);
        // Evict old ref so next cache read picks up the fresh stable ref
        this._lyricsRefCache.delete((0, CacheStore_1.cacheKey)(name, artist));

        const maxRows = Settings_1.Settings.cache.maxRows;
        if (maxRows > 0) this.cache.evict(maxRows);

        this.lastFetchedFrom = appName;
        this.lastFetchedFor  = `${name}\0${artist}`;
        this.lastAttemptedFor = `${name}\0${artist}`;
        return result ? applyConversion(result) : null;
    }
}
exports.LyricsFetcher = LyricsFetcher;
