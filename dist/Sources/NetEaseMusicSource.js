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
exports.NetEaseMusicSource = void 0;
const BaseSource_1 = require("./BaseSource");
class NetEaseMusicSource extends BaseSource_1.BaseSource {
    request(url) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Referer": "https://music.163.com",
                "Cookie": "appver=2.0.2",
                "X-Real-IP": "202.96.0.0"
            }
        });
    }
    getSongId(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.request(`https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5
            `);
            const json = yield request.json();
            if (!json || !json.result || !json.result.songs || json.result.songs.length === 0)
                throw new Error("NetEase: song not found");
            return json.result.songs[0].id;
        });
    }
    getLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const songId = yield this.getSongId(name, artist);
            const request = yield this.request(`https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${songId}`);
            const json = yield request.json();
            if (!json.lrc || !json.lrc.lyric)
                throw "Lyrics not found";
            return this.parseLyrics(json.lrc.lyric);
        });
    }
    parseLyrics(lyrics) {
        const lines = lyrics.split("\n");
        const result = {
            lines: []
        };
        const regexp = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/;
        for (let line of lines) {
            if (!line)
                continue;
            const timestamps = [];
            for (let match = line.match(regexp); match; match = line.match(regexp)) {
                const m = +match[1];
                const s = +match[3];
                const ms = +match[4];
                line = line.replace(regexp, "");
                timestamps.push((60 * m + s) * 1000 + ms);
            }
            // Strip Chinese metadata lines (作词/作曲/编曲/制作人 etc.)
            // and section labels like [Verse], [Chorus], [Bridge], [Intro], [Outro]
            const isMetadata = /^\s*(作词|作曲|编曲|制作人|录音|混音|母带|出品|发行|OP|SP|制作)\s*[：:]/u.test(line);
            const isSection = /^\s*\[(verse|chorus|bridge|intro|outro|hook|pre-chorus|refrain|interlude|outro|drop|build|break|skit|spoken|rap|instrumental|ad.?lib)\s*\d*\]\s*$/i.test(line);
            if (isMetadata || isSection) continue;
            for (const timestamp of timestamps) {
                result.lines.push({
                    time: timestamp,
                    text: line
                });
            }
        }
        result.lines.sort((a, b) => a.time - b.time);
        return result;
    }
    getAppName() {
        return "NetEase Music";
    }
}
exports.NetEaseMusicSource = NetEaseMusicSource;
