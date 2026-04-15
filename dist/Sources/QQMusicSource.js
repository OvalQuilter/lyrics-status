"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QQMusicSource = void 0;
const BaseSource_1 = require("./BaseSource");
const he_1 = require("he");
class QQMusicSource extends BaseSource_1.BaseSource {
    async request(url) {
        return fetch(url, {
            headers: {
                "Referer": "http://y.qq.com/portal/player.html"
            }
        });
    }
    async getSongId(name, artist) {
        const request = await this.request(`https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?inCharset=utf-8&outCharset=utf-8&key=${encodeURIComponent(`${name}-${artist}`)}`);
        const json = await request.json();
        if (json.count <= 0)
            throw "Song not found";
        return json.data.song.itemlist[0].mid;
    }
    async getLyrics(name, artist) {
        const songId = await this.getSongId(name, artist);
        const request = await this.request(`http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&format=json&inCharset=utf-8&outCharset=utf-8&songmid=${songId}`);
        const json = await request.json();
        if (!json.lyric)
            throw "Lyrics not found";
        return this.parseLyrics(json.lyric);
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
