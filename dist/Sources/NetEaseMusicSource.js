"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetEaseMusicSource = void 0;
const NE_RE = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/;
const NE_HEADERS = { "Referer": "https://music.163.com", "Cookie": "appver=2.0.2", "X-Real-IP": "202.96.0.0" };
const JUNK_RE = /^\s*(作词|作曲|编曲|制作人|录音|混音|母带|出品|发行|OP|SP|制作)\s*[：:]|^\s*\[(verse|chorus|bridge|intro|outro|hook|pre-chorus|refrain|interlude|drop|build|break|skit|spoken|rap|instrumental|ad.?lib)\s*\d*\]\s*$/iu;

class NetEaseMusicSource {
    _req(url) { return fetch(url, { method: "POST", headers: NE_HEADERS }); }
    async getSongId(name, artist) {
        const r = await this._req(`https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5`);
        const j = await r.json();
        if (!j?.result?.songs?.length) throw new Error("NetEase: song not found");
        return j.result.songs[0].id;
    }
    async getLyrics(name, artist) {
        const id = await this.getSongId(name, artist);
        const r = await this._req(`https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${id}`);
        const j = await r.json();
        if (!j.lrc?.lyric) throw new Error("NetEase: no lyrics");
        return this.parseLyrics(j.lrc.lyric);
    }
    parseLyrics(lyrics) {
        const lines = [];
        for (let line of lyrics.split("\n")) {
            if (!line || JUNK_RE.test(line)) continue;
            const times = [];
            for (let m = line.match(NE_RE); m; m = line.match(NE_RE)) {
                times.push((60 * +m[1] + +m[3]) * 1000 + (m[4] ? parseInt(String(m[4]).padEnd(3, "0")) : 0));
                line = line.replace(NE_RE, "");
            }
            // Bug 7 fix: skip lines with no timestamp instead of pushing time:0
            // (avoids spurious status at t=0 from non-timestamped metadata that passed JUNK_RE)
            if (!times.length) continue;
            const text = line.trim(); if (text) for (const time of times) lines.push({ time, text });
        }
        return { lines: lines.sort((a, b) => a.time - b.time) };
    }
    getAppName() { return "NetEase Music"; }
}
exports.NetEaseMusicSource = NetEaseMusicSource;
