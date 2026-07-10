"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeniusSource = void 0;

// Genius scraper — no API key required
// 1. Search Genius for the track to get the song page URL
// 2. Fetch the song page and extract plain-text lyrics from data-lyrics-container divs
// 3. Since Genius lyrics are not time-synced, we distribute lines evenly across the song duration
//    The caller (LyricsFetcher) does not require timed lines; lines with time=0 are treated as
//    a single static display. We assign approximate times using a fixed line duration.

const SEARCH_URL = "https://genius.com/api/search/song?q=";
const LINE_DURATION_MS = 4000; // approx ms per line for fake timestamps

class GeniusSource {
    async getLyrics(name, artist, songId) {
        // Step 1: search
        const query = encodeURIComponent(`${name} ${artist}`);
        const searchRes = await fetch(SEARCH_URL + query, {
            headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
        });
        if (!searchRes.ok) throw new Error(`Genius search HTTP ${searchRes.status}`);
        const searchJson = await searchRes.json();
        const hits = searchJson?.response?.sections?.[0]?.hits ?? [];
        if (!hits.length) throw new Error("Genius: no search results");

        // Pick best match — prefer result where artist name matches
        const artistLower = artist.toLowerCase();
        const nameLower = name.toLowerCase();
        let best = hits[0];
        for (const hit of hits) {
            const r = hit.result;
            if (!r) continue;
            const ra = (r.artist_names || r.primary_artist?.name || "").toLowerCase();
            const rt = (r.title || r.full_title || "").toLowerCase();
            if (ra.includes(artistLower) && rt.includes(nameLower)) { best = hit; break; }
        }
        const pageUrl = best?.result?.url;
        if (!pageUrl) throw new Error("Genius: no page URL in result");

        // Step 2: fetch lyrics page
        const pageRes = await fetch(pageUrl, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" }
        });
        if (!pageRes.ok) throw new Error(`Genius page HTTP ${pageRes.status}`);
        const html = await pageRes.text();

        // Step 3: extract lyrics from data-lyrics-container attributes
        const lines = this._extractLines(html);
        if (!lines.length) throw new Error("Genius: no lyrics extracted");
        return { lines };
    }

    _extractLines(html) {
        const lines = [];
        let time = 0;
        // Depth-counting to find balanced </div> — avoids truncation on nested divs
        const openRe = /data-lyrics-container="true"[^>]*>/g;
        let m;
        while ((m = openRe.exec(html)) !== null) {
            const start = m.index + m[0].length;
            let depth = 1, i = start;
            while (depth > 0 && i < html.length) {
                const o = html.indexOf('<div', i);
                const c = html.indexOf('</div>', i);
                if (c === -1) break;
                if (o !== -1 && o < c && /[\s>]/.test(html[o + 4] || '')) { depth++; i = o + 4; }
                else { depth--; i = c + 6; }
            }
            if (depth !== 0) continue;
            const inner = html.slice(start, i - 6);
            const text = inner
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]+>/g, "")
                .replace(/&#x27;|&#39;/g, "'")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&nbsp;/g, " ");
            for (const raw of text.split("\n")) {
                const line = raw.trim();
                if (!line || /^\[.*\]$/.test(line)) continue;
                lines.push({ time, text: line });
                time += LINE_DURATION_MS;
            }
        }
        return lines;
    }

    getAppName() { return "Genius"; }
}
exports.GeniusSource = GeniusSource;
