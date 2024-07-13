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
const he_1 = require("he");
class NetEaseMusicSource extends BaseSource_1.BaseSource {
    request(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(url, {
                method: "POST",
                headers: {
                    "Referer": "https://music.163.com",
                    "Cookie": "appver=2.0.2",
                    "X-Real-IP": "202.96.0.0"
                }
            });
        });
    }
    getSongId(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.request(`https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5
            `);
            const json = yield request.json();
            if (json.result.songCount <= 0)
                throw "Song not found";
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
        for (const line of lines) {
            if (!line)
                continue;
            const match = line.match(regexp);
            if (!(match && match[1] && match[3] && match[4]))
                continue;
            const m = +match[1];
            const s = +match[3];
            const ms = +match[4];
            const text = line.replace(regexp, "");
            result.lines.push({
                time: (60 * m + s) * 1000 + ms,
                text: (0, he_1.decode)(text)
            });
        }
        return result;
    }
    getAppName() {
        return "NetEase Music";
    }
}
exports.NetEaseMusicSource = NetEaseMusicSource;
