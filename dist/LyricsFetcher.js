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
const node_fs_1 = require("node:fs");
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
                    this.lastFetchedFrom = "Cache";
                    break;
                }
                try {
                    this.lastFetchedFor = name + artist;
                    result = yield source.getLyrics(name, artist);
                    this.lastFetchedFrom = source.getAppName();
                    this.cacheLyrics(name, artist, result);
                }
                catch (_a) { }
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
            lyrics = JSON.parse((0, node_fs_1.readFileSync)(path).toString());
        }
        catch (_a) { }
        return lyrics;
    }
    cacheLyrics(name, artist, lyrics) {
        if (!(0, node_fs_1.existsSync)("./cache"))
            (0, node_fs_1.mkdirSync)("./cache");
        (0, node_fs_1.writeFileSync)(`./cache/${name}-${artist}.json`, JSON.stringify(lyrics));
    }
}
exports.LyricsFetcher = LyricsFetcher;
