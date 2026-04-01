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
        const request = await this.request(`https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5`);
        const json = await request.json();
        if (!json || !json.result || !json.result.songs || json.result.songs.length === 0)
            throw new Error("NetEase: song not found");
        return json.result.songs[0].id;
    }
    async getLyrics(name, artist) {
        const songId = await this.getSongId(name, artist);
        const request = await this.request(`https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${songId}`);
        const json = await request.json();
        if (!json.lrc || !json.lrc.lyric) throw "Lyrics not found";
        return this.parseLyrics(json.lrc.lyric);
    }
    parseLyrics(lyrics) {
        const lines = lyrics.split("\n");
        const result = { lines: [] };
        const regexp = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/;
        for (let line of lines) {
            if (!line) continue;
            const timestamps = [];
            for (let match = line.match(regexp); match; match = line.match(regexp)) {
                const m = +match[1];
                const s = +match[3];
                const ms = match[4] ? parseInt(String(match[4]).padEnd(3, "0")) : 0;
                line = line.replace(regexp, "");
                timestamps.push((60 * m + s) * 1000 + ms);
            }
            const isMetadata = /^\s*(作词|作曲|编曲|制作人|录音|混音|母带|出品|发行|OP|SP|制作)\s*[：:]/u.test(line);
            const isSection = /^\s*\[(verse|chorus|bridge|intro|outro|hook|pre-chorus|refrain|interlude|outro|drop|build|break|skit|spoken|rap|instrumental|ad.?lib)\s*\d*\]\s*$/i.test(line);
            if (isMetadata || isSection) continue;
            for (const timestamp of timestamps) {
                result.lines.push({ time: timestamp, text: line });
            }
        }
        result.lines.sort((a, b) => a.time - b.time);
        return result;
    }
    getAppName() { return "NetEase Music"; }
}
exports.NetEaseMusicSource = NetEaseMusicSource;
