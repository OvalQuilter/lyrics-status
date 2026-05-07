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
// ─── LyricsFetcher ────────────────────────────────────────────────────────────
/**
 * Tries each registered {@link BaseSource} in order until one returns synced
 * lyrics. Results are cached to disk under `./cache/` to avoid redundant
 * network requests on repeated plays.
 */
class LyricsFetcher {
    constructor() {
        this.sources = [];
        /** Human-readable name of the source that provided the last result. */
        this.lastFetchedFrom = "Not fetched";
        /** `name + artist` key of the last fetch attempt (used to detect mid-fetch song switches). */
        this.lastFetchedFor = "";
    }
    // ── Source registration ───────────────────────────────────────────────────
    addSource(source) {
        this.sources.push(source);
    }
    // ── Fetch ─────────────────────────────────────────────────────────────────
    /**
     * Returns synced lyrics for the given track, or `null` if no source has them.
     * Checks the disk cache first before hitting any network source.
     */
    fetchLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastFetchedFrom = "Not fetched";
            this.lastFetchedFor = name + artist;
            const cached = this.readCache(name, artist);
            if (cached) {
                this.lastFetchedFrom = `Cache (${cached.appName})`;
                return cached;
            }
            for (const source of this.sources) {
                try {
                    const lyrics = yield source.getLyrics(name, artist);
                    this.lastFetchedFrom = source.getAppName();
                    this.writeCache(name, artist, lyrics, source.getAppName());
                    return lyrics;
                }
                catch (_a) {
                    // Source failed — try the next one
                }
            }
            return null;
        });
    }
    // ── Cache ─────────────────────────────────────────────────────────────────
    cachePath(name, artist) {
        return `./cache/${name}-${artist}.json`;
    }
    readCache(name, artist) {
        try {
            return JSON.parse((0, fs_1.readFileSync)(this.cachePath(name, artist), "utf-8"));
        }
        catch (_a) {
            return null;
        }
    }
    writeCache(name, artist, lyrics, appName) {
        if (!(0, fs_1.existsSync)("./cache"))
            (0, fs_1.mkdirSync)("./cache");
        (0, fs_1.writeFileSync)(this.cachePath(name, artist), JSON.stringify(Object.assign(Object.assign({}, lyrics), { appName })));
    }
}
exports.LyricsFetcher = LyricsFetcher;
