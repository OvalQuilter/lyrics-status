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

function applyUnicodeStyle(s, style) {
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
        return { style: bucket % 2 === 0 ? "bold" : "italic", bucket };
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
    }

    _discordPatch(body, token) {
        return fetch("https://discordapp.com/api/v8/users/@me/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": token || Settings_1.Settings.credentials.token },
            body: JSON.stringify(body)
        });
    }

    changeStatusRequest(text, token, emoji, mergedLines, sentLine) {
        if (!this._captureReady) {
            Debug_1.Debug.write(`[StatusChanger] Capture not ready — skipping send`);
            return Promise.resolve();
        }
        if (Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected) {
            Debug_1.Debug.write(`[StatusChanger] Sending via gateway: "${text}" | emoji: ${emoji}`);
            const sent = this._gateway.setCustomStatus(text, emoji);
            if (sent) {
                this._gwRateLimitSkips = 0;
                if (this._iOSSyncPending) { this._iOSSyncPending = null; this._iOSSync(text, emoji); }
            } else {
                this._gwRateLimitSkips = (this._gwRateLimitSkips || 0) + 1;
                if (this._gwRateLimitSkips >= 5) { this._gwRateLimitSkips = 0; this._iOSSyncPending = null; Debug_1.Debug.write('[StatusChanger] GW rate-limit skip limit -- cleared iOSSyncPending'); }
                // FIX RL1: roll back sentLines for retry, but stamp _lastSentAt=now so the
                // minInterval guard in changeStatus() throttles re-entry instead of tight-looping
                if (mergedLines) for (const ml of mergedLines) this.sentLines.delete(ml);
                this._lastSentText = "";
                this._lastSentAt = Date.now();
                Debug_1.Debug.write('[StatusChanger] GW skipped -- rolled back sentLines, throttling retry');
            }
            return Promise.resolve();
        }

        const now = Date.now();
        Debug_1.Debug.write(`[StatusChanger] Sending Discord status (REST): "${text}" | emoji: ${emoji}`);
        const _expiresMs = sentLine && sentLine._nextLineTime != null ? Math.min(Math.max(sentLine._nextLineTime - this.playbackState.songProgress + 2000, 30000), 300000) : 60000;
        const request = this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji, expires_at: new Date(now + _expiresMs).toISOString() } }, token);
        request.then(res => {
            const elapsed = Date.now() - now;
            if (res.status === 429) {
                res.text().then(raw => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited (HTTP 429) | body: ${raw}`);
                    let retryAfter = 30;
                    try { const b = JSON.parse(raw); if (typeof b.retry_after === "number" && b.retry_after > 0) retryAfter = b.retry_after; }
                    catch (e) { Debug_1.Debug.write(`[StatusChanger] Failed to parse rate limit body, defaulting to ${retryAfter}s: ${e}`); }
                    if (Settings_1.Settings.rateLimit.enableBackoff) {
                        this._rateLimitedUntil = Date.now() + retryAfter * 1000;
                        Debug_1.Debug.write(`[StatusChanger] Backing off ${retryAfter}s — rolling back sent state for retry`);
                    } else {
                        Debug_1.Debug.write(`[StatusChanger] Rate limit (backoff disabled): ${retryAfter}s suggested`);
                    }
                    if (mergedLines) for (const ml of mergedLines) this.sentLines.delete(ml);
                    if (sentLine && this.playbackState.currentLine === sentLine) this.playbackState.currentLine = null;
                    this._lastSentText = "";
                    this._lastSentAt = 0;
                }).catch(e => {
                    Debug_1.Debug.write(`[StatusChanger] Rate limited but failed to read response body: ${e}`);
                    if (Settings_1.Settings.rateLimit.enableBackoff) this._rateLimitedUntil = Date.now() + 30000;
                });
            } else if (res.status === 200) {
                Debug_1.Debug.write(`[StatusChanger] OK (${elapsed}ms)`);
                this.autooffset.addValue(elapsed);
            } else {
                res.text().then(b => Debug_1.Debug.write(`[StatusChanger] Error HTTP ${res.status}: ${b}`)).catch(() => {});
            }
        }).catch(err => Debug_1.Debug.write(`[StatusChanger] Fetch error: ${err}`));
        return request;
    }

    restoreStatus() {
        const s = this._savedStatus;
        if (!s) return;
        Debug_1.Debug.write(`[StatusChanger] Restoring saved status: "${s.text}"`);
        _patchLog(
            this._discordPatch({ custom_status: { text: s.text || "", emoji_name: s.emoji_name || null, emoji_id: s.emoji_id || null, expires_at: s.expires_at || null } }),
            "Restore"
        );
    }

    smartTruncate(text, limit = 128, lyricLines = null) {
        if (!text) return "";
        if (cpFitsIn(text, limit)) return text;
        if (lyricLines && lyricLines.length > 1) {
            const lines = lyricLines.slice();
            while (lines.length > 1) {
                lines.pop();
                const candidate = lines.join(" ");
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

    // FIX: accept ignoreStale param so style-bucket resends bypass the stale guard
    buildMergedLines(lines, anchorIndex, mergeWindowMs, ignoreStale = false) {
        const anchor = lines[anchorIndex];
        let lyricLines = [sanitizeLyric(anchor.text || "")];
        let mergedLines = [anchor];
        if (mergeWindowMs > 0) {
            for (let j = anchorIndex - 1; j >= 0; j--) {
                const gapFromAnchor = anchor.time - lines[j].time;
                if (gapFromAnchor > mergeWindowMs) break;
                if (!lines[j].text) continue;
                if (ignoreStale && !this.sentLines.has(lines[j])) continue;
                if (!ignoreStale && this.sentLines.has(lines[j]) && !this._staleLines.has(lines[j])) break;
                lyricLines.unshift(sanitizeLyric(lines[j].text));
                mergedLines.unshift(lines[j]);
            }
        }
        const joinedLines = lyricLines.map((l, i) => {
            if (i === 0) return l;
            return endsWithTerminal(lyricLines[i - 1]) ? l : lcFirst(l);
        });
        return { mergedText: joinedLines.join(" "), lyricLines, mergedLines };
    }

    applyTemplate(template, mergedText, line, ps, lineIndex, totalLines) {
        if (mergedText) {
            // Strip NetEase composer/arranger credit lines and instrumental placeholder
            mergedText = mergedText.replace(/作曲\s*[:：][^\n]*/g, '').replace(/作词\s*[:：][^\n]*/g, '').replace(/编曲\s*[:：][^\n]*/g, '').replace(/纯音乐[，,]请欣赏/g, '').replace(/此歌曲为没有填词的纯音乐/g, '').trim();
        }
        // Fall back to song name if lyrics empty after filtering
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
        // Clean up orphaned leading punctuation when lyrics resolved to empty
        out = out.replace(/^[\s\.,;:\-!?]+/, '').trim();
        return out;
    }

    _iOSSync(text, emoji) {
        if (!this._captureReady || !text || this._restoreTimer) return;
        if (!Settings_1.Settings.gateway || !Settings_1.Settings.gateway.enabled) return;
        const now = Date.now();
        if (now - this._iOSSyncSentAt < 10000) return;
        this._iOSSyncSentAt = now;
        Debug_1.Debug.write('[StatusChanger] iOS REST sync: ' + JSON.stringify(text));
        _patchLog(
            this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji || null, expires_at: new Date(now + 60000).toISOString() } }),
            "iOS REST sync"
        );
    }

    _onGatewayReady() {
        if (!this._lastSentText || this._restoreTimer) return;
        const emoji = (Settings_1.Settings.view.advanced && Settings_1.Settings.view.advanced.enabled)
            ? Settings_1.Settings.view.advanced.customEmoji : "\uD83C\uDFB6";
        this._iOSSync(this._lastSentText, emoji);
    }

    formatSeconds(s) {
        const m = Math.floor(s / 60), sec = s % 60;
        return m + (sec < 10 ? ':0' : ':') + sec;
    }
}
exports.StatusChangerBase = StatusChangerBase;
exports.VALID_FLASH_STATES = VALID_FLASH_STATES;
exports.applyUnicodeStyle = applyUnicodeStyle;
exports.resolveUnicodeStyle = resolveUnicodeStyle;
exports.cpLen = cpLen;
exports.sanitizeLyric = sanitizeLyric;
