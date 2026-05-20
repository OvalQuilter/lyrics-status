"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChangerBase = void 0;
const Settings_1 = require("./Settings");
const Autooffset_1 = require("./Autooffset");
const Debug_1 = require("./Debug");

function cpLen(s) { return [...s].length; }
function cpSlice(s, n) { return [...s].slice(0, n).join(""); }
function cpFitsIn(s, limit) { let n = 0; for (const _ of s) { if (++n > limit) return false; } return true; }
function lcFirst(s) { if (!s) return s; const chars = [...s]; chars[0] = chars[0].toLowerCase(); return chars.join(""); }
function endsWithTerminal(s) { return /[.!?]\s*$/.test(s); }

const _BOLD_LO = 0x1D41A - 0x61;
const _BOLD_HI = 0x1D400 - 0x41;
const _ITAL_LO = 0x1D44E - 0x61;
const _ITAL_HI = 0x1D434 - 0x41;

function toUnicodeBold(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + _BOLD_LO);
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + _BOLD_HI);
        return ch;
    }).join("");
}
function toUnicodeItalic(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp === 0x68) return "\u210E";
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + _ITAL_LO);
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + _ITAL_HI);
        return ch;
    }).join("");
}
function toUnicodeBoldItalic(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D482 - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D468 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeSans(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D5BA - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D5A0 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeSansBold(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D5EE - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D5D4 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeSansItalic(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D622 - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D608 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeSansBoldItalic(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D656 - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D63C - 0x41));
        return ch;
    }).join("");
}
function toUnicodeDoubleStruck(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D552 - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D538 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeFraktur(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D51E - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D504 - 0x41));
        return ch;
    }).join("");
}
function toUnicodeFrakturBold(s) {
    return [...s].map(ch => {
        const cp = ch.codePointAt(0);
        if (cp >= 0x61 && cp <= 0x7A) return String.fromCodePoint(cp + (0x1D586 - 0x61));
        if (cp >= 0x41 && cp <= 0x5A) return String.fromCodePoint(cp + (0x1D56C - 0x41));
        return ch;
    }).join("");
}
function sanitizeLyric(s) {
    return s
        .replace(/[\u266A\u266B\u266C\u266D\u266E\u266F]/g, "")
        .replace(/\u2026/g, "...")
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2013/g, "-")
        .replace(/\u2014/g, "-")
        .replace(/[\uE000-\uF8FF]/g, "")
        .replace(/[\uFFF0-\uFFFF]/g, "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
        .replace(/\uFEFF/g, "")
        .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u2064]/g, "")
        .trim();
}

function applyUnicodeStyle(s, style) {
    if (style === "bold")            return toUnicodeBold(s);
    if (style === "italic")          return toUnicodeItalic(s);
    if (style === "bold_italic")     return toUnicodeBoldItalic(s);
    if (style === "sans")             return toUnicodeSans(s);
    if (style === "sans_bold")        return toUnicodeSansBold(s);
    if (style === "sans_italic")      return toUnicodeSansItalic(s);
    if (style === "sans_bold_italic") return toUnicodeSansBoldItalic(s);
    if (style === "double_struck")    return toUnicodeDoubleStruck(s);
    if (style === "fraktur")          return toUnicodeFraktur(s);
    if (style === "fraktur_bold")     return toUnicodeFrakturBold(s);
}

// FIX: accept `now` param so caller controls the timestamp — avoids bucket desync
// when interval boundary falls between changeStatus's bucket check and this call
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
const TEMPLATE_RE = new Map();
for (const v of VARS) for (const s of SUFFIXES) TEMPLATE_RE.set(v + s, new RegExp(`\\{${v}${s}\\}`, "g"));

const VALID_FLASH_STATES = new Set(["online", "idle", "dnd", "invisible"]);

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
            }
            return Promise.resolve();
        }

        const now = Date.now();
        Debug_1.Debug.write(`[StatusChanger] Sending Discord status (REST): "${text}" | emoji: ${emoji}`);
        const request = this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji, expires_at: new Date(Date.now() + 60000).toISOString() } }, token);
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
                    if (this._lastMergedLines) {
                        for (const ml of this._lastMergedLines) this.sentLines.delete(ml);
                    }
                    if (sentLine && this.playbackState.currentLine === sentLine) {
                        this.playbackState.currentLine = null;
                    }
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
        this._discordPatch({ custom_status: { text: s.text || "", emoji_name: s.emoji_name || null, emoji_id: s.emoji_id || null, expires_at: s.expires_at || null } })
            .then(res => {
                if (res.status === 200) Debug_1.Debug.write(`[StatusChanger] Status restored OK`);
                else res.text().then(b => Debug_1.Debug.write(`[StatusChanger] Restore failed HTTP ${res.status}: ${b}`)).catch(() => {});
            }).catch(e => Debug_1.Debug.write(`[StatusChanger] Restore fetch error: ${e}`));
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
                if (!lines[j].text) break;
                // FIX: skip stale check when caller forces a resend (e.g. style bucket change)
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
            const clean      = v.replace(/[^a-zA-Z\s]/g, "");
            const crop       = k.startsWith("song_") ? v.replace(/( ?- ?.+)|(\(.+\))/gi, "") : v;
            const titleCase  = v.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
            const vals = [v, v.toUpperCase(), v.toLowerCase(), titleCase, clean, clean.toUpperCase(), clean.toLowerCase(), crop, crop.toUpperCase(), crop.toLowerCase()];
            SUFFIXES.forEach((s, i) => { out = out.replace(TEMPLATE_RE.get(k + s), vals[i]); });
        }
        return out;
    }

    _iOSSync(text, emoji) {
        if (!this._captureReady || !text || this._restoreTimer) return;
        if (!Settings_1.Settings.gateway || !Settings_1.Settings.gateway.enabled) return;
        const now = Date.now();
        if (now - this._iOSSyncSentAt < 10000) return;
        this._iOSSyncSentAt = now;
        Debug_1.Debug.write('[StatusChanger] iOS REST sync: ' + JSON.stringify(text));
        this._discordPatch({ custom_status: { text, emoji_id: null, emoji_name: emoji || null, expires_at: new Date(now + 60000).toISOString() } })
            .then(res => {
                if (res.status === 200) Debug_1.Debug.write('[StatusChanger] iOS REST sync OK');
                else res.text().then(b => Debug_1.Debug.write('[StatusChanger] iOS REST sync HTTP ' + res.status + ': ' + b)).catch(() => {});
            }).catch(e => Debug_1.Debug.write('[StatusChanger] iOS REST sync error: ' + e));
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
