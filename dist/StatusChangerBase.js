
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChangerBase = void 0;
const Settings_1 = require("./Settings");
const Autooffset_1 = require("./Autooffset");
const Debug_1 = require("./Debug");

// cpFitsIn is the core iterator; cpLen and cpSlice are kept for external callers
function cpFitsIn(s, limit) { let n = 0; for (const _ of s) { if (++n > limit) return false; } return true; }
function cpLen(s) { let n = 0; for (const _ of s) n++; return n; }
function cpSlice(s, n) { return [...s].slice(0, n).join(""); }
function lcFirst(s) { if (!s) return s; const c = [...s]; c[0] = c[0].toLowerCase(); return c.join(""); }
function endsWithTerminal(s) { return /[.!?]\s*$/.test(s); }

// Generic unicode codepoint shifter. exceptions = { codepoint: replacementChar }
function _unicodeShift(s, loOff, hiOff, exceptions) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (exceptions && cp in exceptions) return exceptions[cp];
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + loOff);
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + hiOff);
        return ch;
    }).join("");
}

const _STYLES = {
    bold:             [0x1D41A - 0x61, 0x1D400 - 0x41, null],
    italic:           [0x1D44E - 0x61, 0x1D434 - 0x41, { 0x68: "\u210E" }],
    bold_italic:      [0x1D482 - 0x61, 0x1D468 - 0x41, null],
    sans:             [0x1D5BA - 0x61, 0x1D5A0 - 0x41, null],
    sans_bold:        [0x1D5EE - 0x61, 0x1D5D4 - 0x41, null],
    sans_italic:      [0x1D622 - 0x61, 0x1D608 - 0x41, null],
    sans_bold_italic: [0x1D656 - 0x61, 0x1D63C - 0x41, null],
    double_struck:    [0x1D552 - 0x61, 0x1D538 - 0x41, { 0x43: "\u2102", 0x48: "\u210D", 0x4E: "\u2115", 0x50: "\u2119", 0x51: "\u211A", 0x52: "\u211D", 0x5A: "\u2124" }],
    fraktur:          [0x1D51E - 0x61, 0x1D504 - 0x41, null],
    fraktur_bold:     [0x1D586 - 0x61, 0x1D56C - 0x41, null],
};

function _unicodeUnderline(s) {
    return [...s].map(ch => /\s/.test(ch) ? ch : ch + "\u0332").join("");
}
function _unicodeStrikethrough(s) {
    return [...s].map(ch => /\s/.test(ch) ? ch : ch + "\u0336").join("");
}

function applyUnicodeStyle(s, style) {
    if (style === "underline") return _unicodeUnderline(s);
    if (style === "strikethrough") return _unicodeStrikethrough(s);
    const entry = _STYLES[style];
    if (!entry) return s;
    return _unicodeShift(s, entry[0], entry[1], entry[2]);
}

const _SANITIZE = [
    [/[\u266A-\u266F]/g, ""],
    [/\u2026/g, "..."],
    [/[\u2018\u2019]/g, "'"],
    [/[\u201C\u201D]/g, '"'],
    [/[\u2013\u2014]/g, "-"],
    [/[\uE000-\uF8FF]/g, ""],
    [/[\uFFF0-\uFFFF]/g, ""],
    [/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ""],
    [/\uFEFF/g, ""],
    [/[\u200B-\u200F\u202A-\u202E\u2060-\u2064]/g, ""],
];
function sanitizeLyric(s) { return _SANITIZE.reduce((r, [p, v]) => r.replace(p, v), s).trim(); }

// FIX: accept `now` param so caller controls the timestamp — avoids bucket desync
function resolveUnicodeStyle(adv, now) {
    if (adv.styleAlternateEnabled) {
        const intervalMs = adv.styleAlternateIntervalMs > 0 ? adv.styleAlternateIntervalMs : 3000;
        const bucket = Math.floor((now != null ? now : Date.now()) / intervalMs);
        const styleA = adv.styleAlternateStyleA || "bold";
        const styleB = adv.styleAlternateStyleB || "italic";
        return { style: bucket % 2 === 0 ? styleA : styleB, bucket };
    }
    return { style: adv.unicodeStyle || "none", bucket: -1 };
}

const VARS = ["lyrics","timestamp","song_name","song_author","source","progress","duration","line_number"];
const SUFFIXES = ["","_upper","_lower","_title_case","_letters_only","_upper_letters_only","_lower_letters_only","_cropped","_upper_cropped","_lower_cropped"];
const TEMPLATE_RE = new Map(
    VARS.flatMap(v => SUFFIXES.map(s => [v + s, new RegExp(`\\{${v}${s}\\}`, "g")]))
);

const VALID_FLASH_STATES = new Set(["online", "idle", "dnd", "invisible"]);

// Shared helper: log a discord PATCH response
function _patchLog(promise, label) {
    return promise.then(res => {
        if (res.status === 200) Debug_1.Debug.write(`[StatusChanger] ${label} OK`);
        else res.text().then(b => Debug_1.Debug.write(`[StatusChanger] ${label} HTTP ${res.status}: ${b}`)).catch(() => {});
    }).catch(e => Debug_1.Debug.write(`[StatusChanger] ${label} error: ${e}`));
}

// Extract dominant RGB from an image URL (samples 8x8 pixels)
function _dominantColor(url) {
    return new Promise((resolve, reject) => {
        try {
            const { createCanvas, loadImage } = require("canvas");
            loadImage(url).then(img => {
                try {
                    const c = createCanvas(8, 8);
                    const ctx = c.getContext("2d");
                    ctx.drawImage(img, 0, 0, 8, 8);
                    const d = ctx.getImageData(0, 0, 8, 8).data;
                    let r = 0, g = 0, b = 0, n = 0;
                    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; n++; }
                    resolve({ r: Math.round(r/n), g: Math.round(g/n), b: Math.round(b/n) });
                } catch(e) { reject(e); }
            }).catch(reject);
        } catch(e) { reject(e); }
    });
}

// Shift hue of an RGB color by `deg` degrees
function _shiftHue(r, g, b, deg) {
    const rn = r/255, gn = g/255, bn = b/255;
    const max = Math.max(rn,gn,bn), min = Math.min(rn,gn,bn), d = max - min;
    let h = 0, s = max === 0 ? 0 : d/max, v = max;
    if (d !== 0) {
        if (max === rn) h = ((gn-bn)/d + (gn<bn?6:0)) / 6;
        else if (max === gn) h = ((bn-rn)/d + 2) / 6;
        else h = ((rn-gn)/d + 4) / 6;
    }
    h = (h + deg/360 + 1) % 1;
    const i = Math.floor(h*6), f = h*6-i, p = v*(1-s), q = v*(1-f*s), t2 = v*(1-(1-f)*s);
    let or, og, ob;
    switch(i%6){
        case 0: or=v;og=t2;ob=p; break; case 1: or=q;og=v;ob=p; break;
        case 2: or=p;og=v;ob=t2; break; case 3: or=p;og=q;ob=v; break;
        case 4: or=t2;og=p;ob=v; break; default: or=v;og=p;ob=q;
    }
    return { r: Math.round(or*255), g: Math.round(og*255), b: Math.round(ob*255) };
}

function _toInt(r, g, b) { return (r << 16) | (g << 8) | b; }

// Boost saturation to min 0.55 and value to min 0.45 so colors are always visible
function _vibrify(r, g, b) {
    const rn=r/255,gn=g/255,bn=b/255;
    const max=Math.max(rn,gn,bn),min=Math.min(rn,gn,bn),d=max-min;
    let h=0,sat=max===0?0:d/max,v=max;
    if(d!==0){
        if(max===rn)h=((gn-bn)/d+(gn<bn?6:0))/6;
        else if(max===gn)h=((bn-rn)/d+2)/6;
        else h=((rn-gn)/d+4)/6;
    }
    sat=Math.max(sat,0.55); v=Math.max(v,0.45);
    const i=Math.floor(h*6),f=h*6-i,p2=v*(1-sat),q=v*(1-f*sat),t=v*(1-(1-f)*sat);
    let or,og,ob;
    switch(i%6){case 0:or=v;og=t;ob=p2;break;case 1:or=q;og=v;ob=p2;break;case 2:or=p2;og=v;ob=t;break;case 3:or=p2;og=q;ob=v;break;case 4:or=t;og=p2;ob=v;break;default:or=v;og=p2;ob=q;}
    return{r:Math.round(or*255),g:Math.round(og*255),b:Math.round(ob*255)};
}

class StatusChangerBase {
    constructor(playbackState, savedStatus, gatewayClient) {
        this.playbackState = playbackState;
        this.sentLines = new Set();
        this._staleLines = new Set();
        this.autooffset = new Autooffset_1.Autooffset();
        this._rateLimitedUntil = 0;
        this._lastSentAt = 0;
        this._lastSentText = "";
        this._lastStyleBucket = -1;
        this._savedStatus = savedStatus || null;
        this._restoreTimer = null;
        this._gateway = gatewayClient || null;
        this._captureReady = !(Settings_1.Settings.restore && Settings_1.Settings.restore.enabled);
        this._iOSSyncSentAt = 0;
        this._iOSSyncPending = null;
        this._lastMergedLines = null;
        this._lastAnchorLine = null;
        this._flashInterval = null;
        this._flashIndex = 0;
        this._flashActive = false;
        this._flashRestoreSentAt = 0;
        this._gwRateLimitSkips = 0;
        this._pendingRetryText = null; // RL-12
        this._lastColorSongId = null;
    }

    _discordPatch(body, token) {
        return fetch("https://discord.com/api/v10/users/@me/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": token || Settings_1.Settings.credentials.token, "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTM2LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjM5MDAxOCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=", "X-Discord-Locale": "en-US", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36" },
            body: JSON.stringify(body)
        });
    }


    updateProfileColor() {
        return; // disabled — triggers Discord password resets
        const pc = Settings_1.Settings.profileColor;
        if (!pc || !pc.enabled) return;
        const ps = this.playbackState;
        if (!ps.albumArtUrl || !ps.songId || ps.songId === this._lastColorSongId) return;
        this._lastColorSongId = ps.songId;
        const token = Settings_1.Settings.credentials.token;
        if (!token) return;
        const shift = typeof pc.accentShift === "number" ? pc.accentShift : 30;
        _dominantColor(ps.albumArtUrl).then(({ r, g, b }) => {
            const viv = _vibrify(r, g, b);
            const base = _toInt(viv.r, viv.g, viv.b);
            const acc = _shiftHue(viv.r, viv.g, viv.b, shift);
            const accent = _toInt(acc.r, acc.g, acc.b);
            Debug_1.Debug.write(`[ProfileColor] base=#${base.toString(16).padStart(6,'0')} accent=#${accent.toString(16).padStart(6,'0')}`);
            this._discordProfilePatch({ theme_colors: [base, accent] }, token)
                .then(res => {
                    if (res.status === 200) Debug_1.Debug.write("[ProfileColor] OK");
                    else res.text().then(b => Debug_1.Debug.write(`[ProfileColor] HTTP ${res.status}: ${b}`)).catch(() => {});
                }).catch(e => Debug_1.Debug.write("[ProfileColor] error: " + e));
        }).catch(e => Debug_1.Debug.write("[ProfileColor] color extract failed: " + e));
    }

    changeStatusRequest(text, token, emoji, mergedLines, sentLine) {
        if (!this._captureReady) {
            Debug_1.Debug.write(`[StatusChanger] Capture not ready — skipping send`);
            return Promise.resolve();
        }
        if (Settings_1.Settings.gateway?.enabled && this._gateway && this._gateway.connected) {
            Debug_1.Debug.write(`[StatusChanger] Sending via gateway: "${text}" | emoji: ${emoji}`);
            const sent = this._gateway.setCustomStatus(text, emoji);
            if (sent === "hold") { Debug_1.Debug.write('[StatusChanger] GW post-READY hold — not stamping sentLines'); return Promise.resolve(); }
            if (sent) {
                this._gwRateLimitSkips = 0;
                if (this._iOSSyncPending) { const _force = this._iOSSyncPending.t == null; this._iOSSyncPending = null; this._iOSSync(text, emoji, _force); }
            } else {
                this._gwRateLimitSkips = (this._gwRateLimitSkips || 0) + 1;
                if (this._gwRateLimitSkips >= 5) { this._gwRateLimitSkips = 0; this._iOSSyncPending = null; Debug_1.Debug.write('[StatusChanger] GW rate-limit skip limit -- cleared iOSSyncPending'); }
                if (mergedLines) if (mergedLines) for (const ml of mergedLines) { if (!this._rollbackLines) this._rollbackLines = new Set(); this._rollbackLines.add(ml); };
                this._lastMergedLines = null;
                this._lastAnchorLine = null;
                this._pendingRetryText = text;
                this._lastSentText = "";
                this._lastSentAt = 0;
                Debug_1.Debug.write('[StatusChanger] GW skipped -- rolled back sentLines, throttling retry');
            }
            return Promise.resolve();
        }

        const now = Date.now();
        const _jitter = Math.floor(Math.random() * 250);
        const request = new Promise(resolve => setTimeout(() => {
            Debug_1.Debug.write(`[StatusChanger] Sending Discord status (REST): "${text}" | emoji: ${emoji} | jitter: ${_jitter}ms`);
            resolve(this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji, expires_at: null } }, token));
        }, _jitter));
        request.then(res => {
            const elapsed = Date.now() - now;
            if (res.status === 429) {
                res.text().then(raw => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited (HTTP 429) | body: ${raw}`);
                    let retryAfter = 5;
                    try { const b = JSON.parse(raw); if (typeof b.retry_after === "number" && b.retry_after > 0) retryAfter = Math.min(Math.max(b.retry_after, 5), 300); }
                    catch (e) { Debug_1.Debug.write(`[StatusChanger] Failed to parse rate limit body, defaulting to ${retryAfter}s: ${e}`); }
                    this._rateLimitedUntil = Date.now() + retryAfter * 1000;
                    Debug_1.Debug.write(`[StatusChanger] Backing off ${retryAfter}s (backoff=${Settings_1.Settings.rateLimit?.enableBackoff}) — rolling back sent state for retry`);
                    if (mergedLines) if (mergedLines) for (const ml of mergedLines) { if (!this._rollbackLines) this._rollbackLines = new Set(); this._rollbackLines.add(ml); };
                    if (sentLine && this.playbackState.currentLine === sentLine) this.playbackState.currentLine = null;
                    this._lastSentText = "";
                    this._lastSentAt = Date.now();
                }).catch(e => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited but failed to read response body: ${e}`);
                    this._rateLimitedUntil = Date.now() + 5000;
                });
            } else if (res.status === 200) {
                Debug_1.Debug.write(`[StatusChanger] OK (${elapsed}ms)`);
                if (elapsed > 2000) Debug_1.Debug.write(`[StatusChanger] Autooffset: capping spike ${elapsed}ms to 2000ms (RL-15)`);
                this.autooffset.addValue(Math.min(elapsed, 2000));
            } else {
                res.text().then(b => Debug_1.Debug.write(`[StatusChanger] Error HTTP ${res.status}: ${b}`)).catch(() => {});
            }
        }).catch(err => Debug_1.Debug.write(`[StatusChanger] Fetch error: ${err}`));
        return request;
    }

    restoreStatus() {
        if (!this._captureReady) { Debug_1.Debug.write(`[StatusChanger] Restore skipped — capture not ready`); return; }
        const s = this._savedStatus;
        if (!s) return;
        Debug_1.Debug.write(`[StatusChanger] Restoring saved status: "${s.text}"`);
        const _restoreSongId = this.playbackState.songId;
        const _doRestore = (attempt) => {
            if (this.playbackState.songId !== _restoreSongId) return;
            this._discordPatch({ custom_status: { text: s.text || "", emoji_name: s.emoji_name || null, emoji_id: s.emoji_id || null, expires_at: s.expires_at || null } })
                .then(res => {
                    if (res.status === 200) { Debug_1.Debug.write(`[StatusChanger] Restore OK`); }
                    else if (res.status === 429 && attempt < 2) {
                        res.text().then(raw => {
                            let ra = 5; try { const b = JSON.parse(raw); if (typeof b.retry_after === "number" && b.retry_after > 0) ra = Math.min(b.retry_after, 60); } catch (_) {}
                            this._rateLimitedUntil = Date.now() + ra * 1000;
                            Debug_1.Debug.write(`[StatusChanger] Restore 429 — retry in ${ra}s`);
                            setTimeout(() => _doRestore(attempt + 1), ra * 1000);
                        }).catch(() => {});
                    } else { res.text().then(b => Debug_1.Debug.write(`[StatusChanger] Restore HTTP ${res.status}: ${b}`)).catch(() => {}); }
                }).catch(e => Debug_1.Debug.write(`[StatusChanger] Restore error: ${e}`));
        };
        _doRestore(0);
    }

    smartTruncate(text, limit = 128, lyricLines = null) {
        if (!text) return "";
        if (cpFitsIn(text, limit)) return text;
        if (lyricLines && lyricLines.length > 1) {
            const _sep = Settings_1.Settings.rateLimit?.mergeSeparator ?? " ";
            const lines = lyricLines.slice();
            while (lines.length > 1) {
                lines.pop();
                const candidate = lines.join(_sep);
                if (cpFitsIn(candidate, limit)) return candidate;
            }
            text = lines[0] || "";
            if (cpFitsIn(text, limit)) return text;
        }
        const words = text.split(" ");
        while (words.length > 1) {
            words.pop();
            const candidate = words.join(" ");
            if (cpFitsIn(candidate, limit)) return candidate + "...";
        }
        return cpSlice(text, limit - 3) + "...";
    }

    buildMergedLines(lines, anchorIndex, mergeWindowMs, ignoreStale = false, maxLines = 0) {
        const anchor = lines[anchorIndex];
        let lyricLines = [sanitizeLyric(anchor.text || "")];
        let mergedLines = [anchor];
        if (mergeWindowMs > 0) {
                const maxInterGap = Math.min(mergeWindowMs / 2, 2000);
                for (let j = anchorIndex - 1; j >= 0; j--) {
                    const gapFromAnchor = anchor.time - lines[j].time;
                    if (gapFromAnchor > mergeWindowMs) break;
                    if (!lines[j].text) continue;
                    const interGap = lines[j + 1].time - lines[j].time;
                    if (interGap > maxInterGap) break;
                    const _inRollback = this._rollbackLines && this._rollbackLines.has(lines[j]);
                    if (!ignoreStale && this.sentLines.has(lines[j]) && !this._staleLines.has(lines[j]) && !_inRollback) break;
                    lyricLines.unshift(sanitizeLyric(lines[j].text));
                    mergedLines.unshift(lines[j]);
                    if (maxLines > 0 && mergedLines.length >= maxLines) break;
                }
            }
        const joinedLines = lyricLines.map((l, i) => {
            if (i === 0) return l;
            return endsWithTerminal(lyricLines[i - 1]) ? l : lcFirst(l);
        });
        const _sep = Settings_1.Settings.rateLimit?.mergeSeparator ?? " ";
        return { mergedText: joinedLines.join(_sep), lyricLines, joinedLines, mergedLines };
    }

    applyTemplate(template, mergedText, line, ps, lineIndex, totalLines) {
        if (mergedText) {
            mergedText = mergedText.replace(/作曲\s*[:：][^\n]*/g, '').replace(/作词\s*[:：][^\n]*/g, '').replace(/编曲\s*[:：][^\n]*/g, '').replace(/纯音乐[，,]请欣赏/g, '').replace(/此歌曲为没有填词的纯音乐/g, '').trim();
        }
        if (!mergedText) template = '{song_name}';
        const durationSec = isFinite(ps.songDuration) ? +(ps.songDuration / 1000).toFixed(0) : 0;
        const progressSec = isFinite(ps.songProgress) ? +(ps.songProgress / 1000).toFixed(0) : 0;
        const vars = {
            lyrics:       mergedText,
            timestamp:    this.formatSeconds(+(line.time / 1000).toFixed()),
            song_name:    ps.songName   || "",
            song_author:  ps.songAuthor || "",
            source:       ps.lyricsSource || "",
            progress:     this.formatSeconds(progressSec),
            duration:     this.formatSeconds(durationSec),
            line_number:  (lineIndex != null && totalLines != null) ? `${lineIndex + 1}/${totalLines}` : ""
        };
        let out = template;
        for (const [k, v] of Object.entries(vars)) {
            if (!out.includes("{" + k)) continue;
            const clean     = v.replace(/[^a-zA-Z\s]/g, "");
            const crop      = k.startsWith("song_") ? v.replace(/( ?- ?.+)|(\(.+\))/gi, "") : v;
            const titleCase = v.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
            const vals = [v, v.toUpperCase(), v.toLowerCase(), titleCase, clean, clean.toUpperCase(), clean.toLowerCase(), crop, crop.toUpperCase(), crop.toLowerCase()];
            SUFFIXES.forEach((s, i) => { out = out.replace(TEMPLATE_RE.get(k + s), vals[i]); });
        }
        out = out.replace(/^[\s\.,;:\-!?]+/, '').trim();
        return out;
    }

    _iOSSync(text, emoji, force = false) {
        if (!this._captureReady || !text || this._restoreTimer) return;
        if (!Settings_1.Settings.gateway || !Settings_1.Settings.gateway.enabled) return;
        const _syncSongId = this.playbackState.songId;
        const now = Date.now();
        if (!force && now - this._iOSSyncSentAt < 10000) return;
        Debug_1.Debug.write('[StatusChanger] iOS REST sync: ' + JSON.stringify(text));
        const req = this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji || null, expires_at: null } });
        req.then(res => {
            if (res.status === 200) {
                this._iOSSyncSentAt = Date.now();
                Debug_1.Debug.write('[StatusChanger] iOS REST sync OK');
            } else if (res.status === 429) {
                res.text().then(raw => {
                    let retryAfter = 5;
                    try { const b = JSON.parse(raw); if (typeof b.retry_after === 'number' && b.retry_after > 0) retryAfter = b.retry_after; } catch (_) {}
                    Debug_1.Debug.write(`[StatusChanger] iOS REST sync 429 — retrying in ${retryAfter}s`);
                    setTimeout(() => {
                        if (!this._captureReady || this._restoreTimer || this._lastSentText !== text || this.playbackState.songId !== _syncSongId || !Settings_1.Settings.gateway?.enabled) return;
                        if (Date.now() < this._rateLimitedUntil) { Debug_1.Debug.write('[StatusChanger] iOS REST sync retry skipped — still rate limited (RL-03)'); return; }
                        this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji || null, expires_at: null } })
                            .then(r => {
                                if (r.status === 200) { this._iOSSyncSentAt = Date.now(); Debug_1.Debug.write('[StatusChanger] iOS REST sync retry OK'); }
                                else if (r.status === 429) { r.text().then(raw => { let ra=5; try{const b=JSON.parse(raw);if(typeof b.retry_after==='number'&&b.retry_after>0)ra=Math.min(b.retry_after,60);}catch(_){} this._rateLimitedUntil=Date.now()+ra*1000; Debug_1.Debug.write('[StatusChanger] iOS REST sync retry 429 — RL-02'); }).catch(()=>{}); }
                                else { r.text().then(b => Debug_1.Debug.write(`[StatusChanger] iOS REST sync retry HTTP ${r.status}: ${b}`)).catch(()=>{}); }
                            }).catch(e => Debug_1.Debug.write(`[StatusChanger] iOS REST sync retry error: ${e}`));
                    }, retryAfter * 1000);
                }).catch(() => {});
            } else {
                res.text().then(b => Debug_1.Debug.write(`[StatusChanger] iOS REST sync HTTP ${res.status}: ${b}`)).catch(() => {});
            }
        }).catch(e => Debug_1.Debug.write(`[StatusChanger] iOS REST sync error: ${e}`));
    }

    _onGatewayReady() {
        if (!this._lastSentText || this._restoreTimer) return;
        const emoji = (Settings_1.Settings.view.advanced && Settings_1.Settings.view.advanced.enabled)
            ? Settings_1.Settings.view.advanced.customEmoji : "\uD83C\uDFB6";
        const pendingText = this._iOSSyncPending?.t;
        const pendingEmoji = this._iOSSyncPending?.em;
        if (pendingText) {
            this._iOSSyncPending = null;
            this._iOSSync(pendingText, pendingEmoji || emoji);
        } else {
            this._iOSSync(this._lastSentText, emoji);
        }
    }

    formatSeconds(s) {
        const m = Math.floor(s / 60), sec = s % 60;
        return m + (sec < 10 ? ':0' : ':') + sec;
    }
}

function applyWordStyles(text,styleMap){
    if(!styleMap||!styleMap.length)return text;
    const tokens=text.split(/(\s+)/);
    let wi=0;
    return tokens.map(tok=>{
        if(/^\s+$/.test(tok))return tok;
        return applyUnicodeStyle(tok,styleMap[wi++%styleMap.length]);
    }).join('');
}
exports.StatusChangerBase = StatusChangerBase;
exports.VALID_FLASH_STATES = VALID_FLASH_STATES;
exports.applyUnicodeStyle = applyUnicodeStyle;
exports.resolveUnicodeStyle = resolveUnicodeStyle;
exports.cpLen = cpLen;
exports.sanitizeLyric = sanitizeLyric;
exports.applyWordStyles = applyWordStyles;
