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
exports.QQMusicSource = void 0;
const BaseSource_1 = require("./BaseSource");
const he_1 = require("he");
class QQMusicSource extends BaseSource_1.BaseSource {
    request(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(url, {
                headers: {
                    "Referer": "http://y.qq.com/portal/player.html"
                }
            });
        });
    }
    getSongId(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.request(`https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?inCharset=utf-8&outCharset=utf-8&key=${encodeURIComponent(`${name}-${artist}`)}`);
            const json = yield request.json();
            if (json.count <= 0)
                throw "Song not found";
            return json.data.song.itemlist[0].mid;
        });
    }
    getLyrics(name, artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const songId = yield this.getSongId(name, artist);
            const request = yield this.request(`http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&format=json&inCharset=utf-8&outCharset=utf-8&songmid=${songId}`);
            const json = yield request.json();
            if (!json.lyric)
                throw "Lyrics not found";
            return this.parseLyrics(json.lyric);
        });
    }
    parseLyrics(lyrics) {
        const lines = Buffer.from(lyrics, "base64").toString("utf-8").split("\n");
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
        return "QQMusic";
    }
}
exports.QQMusicSource = QQMusicSource;
