"use strict";
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
    async getSongId(name, artist) {
        const request = await this.request(`https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5
            `);
        const json = await request.json();
        if (json.result.songCount <= 0)
            throw "Song not found";
        return json.result.songs[0].id;
    }
    async getLyrics(name, artist) {
        const songId = await this.getSongId(name, artist);
        const request = await this.request(`https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${songId}`);
        const json = await request.json();
        if (!json.lrc || !json.lrc.lyric)
            throw "Lyrics not found";
        return this.parseLyrics(json.lrc.lyric);
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
