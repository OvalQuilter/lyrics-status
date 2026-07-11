"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KugouSource = void 0;
const KG_RE = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/;
const JUNK_RE = /^\s*(作词|作曲|编曲|制作人|录音|混音|母带|出品|发行|OP|SP|制作)\s*[：:]|^\s*\[(verse|chorus|bridge|intro|outro|hook|pre-chorus|refrain|interlude|drop|build|break|skit|spoken|rap|instrumental|ad.?lib)\s*\d*\]\s*$/iu;
const HEADERS = { "User-Agent": "Mozilla/5.0" };

class KugouSource {
    async _searchCandidates(name, artist) {
        const r = await fetch(`http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(`${artist} ${name}`)}&page=1&pagesize=5`, { headers: HEADERS });
        const j = await r.json();
        const info = j?.data?.info;
        if (!info?.length) throw new Error("Kugou: song not found");
        return info; // [{hash, duration, ...}]
    }
    async _pickHash(name, artist, durationMs) {
        const info = await this._searchCandidates(name, artist);
        if (durationMs > 0) {
            const close = info.find(c => Math.abs((c.duration || 0) * 1000 - durationMs) < 5000);
            if (close) return close.hash;
        }
        return info[0].hash;
    }
    async getLyrics(name, artist, songId, durationMs = 0) {
        const hash = await this._pickHash(name, artist, durationMs);
        const sr = await fetch(`https://krcs.kugou.com/search?ver=1&man=yes&client=mobi&hash=${hash}`, { headers: HEADERS });
        const sj = await sr.json();
        const cand = sj?.candidates?.[0];
        if (!cand) throw new Error("Kugou: no lyric candidate");
        const dr = await fetch(`https://lyrics.kugou.com/download?ver=1&client=pc&id=${cand.id}&accesskey=${cand.accesskey}&fmt=lrc&charset=utf8`, { headers: HEADERS });
        const dj = await dr.json();
        if (!dj?.content) throw new Error("Kugou: empty lyric content");
        let text = dj.content;
        // content is usually base64; decode only if it looks like base64 (not already plain LRC)
        if (!/^\s*\[/.test(text)) {
            try { text = Buffer.from(text, "base64").toString("utf8"); } catch (_) {}
        }
        if (!/^\s*\[/.test(text)) throw new Error("Kugou: unrecognized lyric format");
        return this.parseLyrics(text);
    }
    parseLyrics(lyrics) {
        const lines = [];
        for (let line of lyrics.split("\n")) {
            if (!line || JUNK_RE.test(line)) continue;
            const times = [];
            for (let m = line.match(KG_RE); m; m = line.match(KG_RE)) {
                times.push((60 * +m[1] + +m[3]) * 1000 + (m[4] ? parseInt(String(m[4]).padEnd(3, "0")) : 0));
                line = line.replace(KG_RE, "");
            }
            if (!times.length) continue;
            const text = line.trim(); if (text) for (const time of times) lines.push({ time, text });
        }
        return { lines: lines.sort((a, b) => a.time - b.time) };
    }
    getAppName() { return "Kugou"; }
}
exports.KugouSource = KugouSource;
