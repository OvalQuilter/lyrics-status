"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsFetcher = void 0;
const fs_1 = require("fs");
const Debug_1 = require("./Debug");
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
        const cacheHasSpotifyWords = !!cache && cache.appName === "Spotify" && this.hasWordTimings(cache);
        let result = null;
        for (const source of this.sources) {
            try {
                this.lastFetchedFor = name + artist;
                const sourceName = source.getAppName();
                if (cache && cache.appName === sourceName) {
                    if (sourceName === "Spotify" && cacheHasSpotifyWords) {
                        result = this.normalizeLyrics(cache);
                        this.lastFetchedFrom = `Cache (${cache.appName})`;
                        break;
                    }
                    if (sourceName !== "Spotify") {
                        const normalizedCache = this.normalizeLyrics(cache);
                        result = sourceName === "LrcLib" ? this.stripWordTimings(normalizedCache) : normalizedCache;
                        this.lastFetchedFrom = `Cache (${cache.appName})`;
                        break;
                    }
                }
                const fetched = this.normalizeLyrics(await source.getLyrics(name, artist));
                if (sourceName === "Spotify") {
                    if (!this.hasWordTimings(fetched)) {
                        Debug_1.Debug.write("Spotify lyrics missing word timings, falling back to other sources");
                        continue;
                    }
                    result = fetched;
                }
                else if (sourceName === "LrcLib") {
                    result = this.stripWordTimings(fetched);
                }
                else {
                    result = fetched;
                }
                this.lastFetchedFrom = sourceName;
                this.cacheLyrics(name, artist, result, this.lastFetchedFrom);
            }
            catch (error) {
                Debug_1.Debug.write(`Lyrics fetch error from ${source.getAppName()}: ${error.message}`);
            }
            if (result)
                break;
        }
        if (!result && cache) {
            if (cache.appName === "Spotify" && !this.hasWordTimings(cache)) {
                return null;
            }
            this.lastFetchedFrom = `Cache (${cache.appName})`;
            const normalizedCache = this.normalizeLyrics(cache);
            result = cache.appName === "LrcLib" ? this.stripWordTimings(normalizedCache) : normalizedCache;
        }
        return result;
    }
    fetchCachedLyrics(name, artist) {
        const path = `./cache/${name}-${artist}.json`;
        let lyrics = null;
        try {
            lyrics = JSON.parse((0, fs_1.readFileSync)(path).toString());
        }
        catch { }
        return lyrics;
    }
    cacheLyrics(name, artist, lyrics, appName) {
        if (!(0, fs_1.existsSync)("./cache"))
            (0, fs_1.mkdirSync)("./cache");
        (0, fs_1.writeFileSync)(`./cache/${name}-${artist}.json`, JSON.stringify({
            ...lyrics,
            appName
        }));
    }
    normalizeLyrics(lyrics) {
        const lines = [...lyrics.lines].sort((a, b) => a.time - b.time);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (!line.endTime || line.endTime <= line.time) {
                if (nextLine && nextLine.time > line.time) {
                    line.endTime = nextLine.time;
                }
            }
            if (line.words && line.words.length > 0) {
                line.words = line.words
                    .filter(word => Number.isFinite(word.startTime) && !!word.text)
                    .sort((a, b) => a.startTime - b.startTime);
                for (let w = 0; w < line.words.length; w++) {
                    const word = line.words[w];
                    if (!word.endTime || word.endTime <= word.startTime) {
                        const nextWord = line.words[w + 1];
                        if (nextWord?.startTime && nextWord.startTime > word.startTime) {
                            word.endTime = nextWord.startTime;
                        }
                        else if (line.endTime && line.endTime > word.startTime) {
                            word.endTime = line.endTime;
                        }
                    }
                }
            }
        }
        return {
            ...lyrics,
            lines
        };
    }
    hasWordTimings(lyrics) {
        return lyrics.lines.some(line => line.words && line.words.length > 0);
    }
    stripWordTimings(lyrics) {
        const lines = lyrics.lines.map(line => {
            if (!line.words)
                return line;
            const { words, ...rest } = line;
            return rest;
        });
        return {
            ...lyrics,
            lines
        };
    }
}
exports.LyricsFetcher = LyricsFetcher;
