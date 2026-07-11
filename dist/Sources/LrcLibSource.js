"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LrcLibSource = void 0;
// Bug 6 fix: use two separate regexes — one /g for exec loop, one non-/g for replace
// Avoids relying on lastIndex being 0 after exec exhaustion before .replace() runs
const LRC_RE_G = /\[(\d\d):(\d\d)(?:\.(\d+))?]/g;
const LRC_RE   = /\[(\d\d):(\d\d)(?:\.(\d+))?]/;

class LrcLibSource {
    async getLyrics(name, artist) {
        const r = await fetch(`https://lrclib.net/api/get?track_name=${encodeURIComponent(name)}&artist_name=${encodeURIComponent(artist)}`);
        if (!r.ok) throw new Error(`LrcLib HTTP ${r.status}`);
        const j = await r.json();
        if (!j.syncedLyrics?.trim()) throw new Error("LrcLib: no synced lyrics");
        return this.parseLyrics(j.syncedLyrics);
    }
    parseLyrics(lyrics) {
        const lines = [];
        for (const line of lyrics.split("\n")) {
            if (!line.trim()) continue;
            const times = [];
            let m;
            LRC_RE_G.lastIndex = 0;
            while ((m = LRC_RE_G.exec(line)) !== null)
                times.push((+m[1] * 60 + +m[2]) * 1000 + (m[3] ? parseInt(m[3].padEnd(3, "0").slice(0, 3)) : 0));
            const text = line.replace(LRC_RE, "").trim();
            if (!text) continue;
            for (const time of times.length ? times : [0]) lines.push({ time, text });
        }
        return { lines: lines.sort((a, b) => a.time - b.time) };
    }
    getAppName() { return "LrcLib"; }
}
exports.LrcLibSource = LrcLibSource;
