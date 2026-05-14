"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Autooffset_1 = require("./Autooffset");
const Debug_1 = require("./Debug");

// Unicode code-point safe helpers
function cpLen(s) { return [...s].length; }
function cpSlice(s, n) { return [...s].slice(0, n).join(""); }
// Short-circuit: returns false as soon as code-point count exceeds limit (no full expand)
function cpFitsIn(s, limit) { let n = 0; for (const _ of s) { if (++n > limit) return false; } return true; }

// Pre-compiled template regex map — built once at module load, not per applyTemplate() call
const VARS = ["lyrics","timestamp","song_name","song_author","source","progress","duration","line_number"];
const SUFFIXES = ["","_upper","_lower","_title_case","_letters_only","_upper_letters_only","_lower_letters_only","_cropped","_upper_cropped","_lower_cropped"];
const TEMPLATE_RE = new Map(); // key: "varname_suffix" → RegExp
for (const v of VARS) for (const s of SUFFIXES) TEMPLATE_RE.set(v + s, new RegExp(`\\{${v}${s}\\}`, "g"));

class StatusChanger {
    constructor(playbackState, savedStatus, gatewayClient) {
        this.playbackState = playbackState;
        this.sentLines = new Set();
        this.autooffset = new Autooffset_1.Autooffset();
        this._rateLimitedUntil = 0;
        this._lastSentAt = 0;
        this._lastSentText = "";
        this._savedStatus = savedStatus || null;
        this._restoreTimer = null;
        this._gateway = gatewayClient || null;
        this._captureReady = !(Settings_1.Settings.restore && Settings_1.Settings.restore.enabled);
        this._iOSSyncSentAt = 0;
        this._iOSSyncPending = null;
        this._lastMergedLines = null; // Bug 15 fix: init in constructor
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
        // Use gateway if enabled in settings and connected; fall back to REST otherwise
        if (Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected) {
            Debug_1.Debug.write(`[StatusChanger] Sending via gateway: "${text}" | emoji: ${emoji}`);
            const sent = this._gateway.setCustomStatus(text, emoji);
            // Bug 9 fix: fire iOSSync regardless of whether .t was pre-populated;
            // use the text/emoji passed directly into this function (always current)
            if (sent && this._iOSSyncPending) {
                this._iOSSyncPending = null;
                this._iOSSync(text, emoji);
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

    buildMergedLines(lines, anchorIndex, mergeWindowMs) {
        const anchor = lines[anchorIndex];
        let lyricLines = [anchor.text || ""];
        let mergedLines = [anchor];
        if (mergeWindowMs > 0) {
            for (let j = anchorIndex - 1; j >= 0; j--) {
                const gapFromAnchor = anchor.time - lines[j].time;
                if (gapFromAnchor > mergeWindowMs) break;
                if (!lines[j].text) continue;
                if (this.sentLines.has(lines[j])) continue;
                lyricLines.unshift(lines[j].text);
                mergedLines.unshift(lines[j]);
            }
        }
        return { mergedText: lyricLines.join(" "), lyricLines, mergedLines };
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
        return out.replace(/\u266a/g, "\uD83C\uDFB6");
    }

    // Fires a background REST PATCH to keep iOS in sync.
    // Guards: captureReady, gateway enabled, non-empty text,
    // no restore pending, 10s debounce.
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

    // Called on GatewayClient op 0 READY (reconnect).
    // Re-syncs last known status via REST so iOS picks it up.
    // Bug 13 fix: use same emoji logic as changeStatus (respect advanced customEmoji)
    _onGatewayReady() {
        if (!this._lastSentText || this._restoreTimer) return;
        const emoji = (Settings_1.Settings.view.advanced && Settings_1.Settings.view.advanced.enabled)
            ? Settings_1.Settings.view.advanced.customEmoji : "\uD83C\uDFB6";
        this._iOSSync(this._lastSentText, emoji);
    }

    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) return;
        const lyrics = playbackState.lyrics;
        if (!lyrics) return;

        const now = Date.now();
        const usingGateway = Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        const { enableBackoff, enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs } = Settings_1.Settings.rateLimit;
        if (!usingGateway && enableBackoff && now < this._rateLimitedUntil) return;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        if (!usingGateway && minInterval > 0 && now - this._lastSentAt < minInterval) return;

        const currentLine = playbackState.currentLine;
        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : Settings_1.Settings.timings.sendTimeOffset;

        const mergeWindow = enableMergeLines ? (mergeWindowMs || 8000) : 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (line.time < (songProgress + offset)) {
                if (!line.text) continue;
                if (nextLine && nextLine.time < (songProgress + offset)) continue;
                if (this.sentLines.has(line)) break;
                if (line === currentLine) break;

                let mergedText, lyricLines, mergedLines;
                if (mergeWindow === 0) {
                    mergedText = line.text || "";
                    lyricLines = [mergedText];
                    mergedLines = [line];
                } else {
                    ({ mergedText, lyricLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindow));
                }

                let statusText;
                let emoji;

                if (Settings_1.Settings.view.advanced.enabled) {
                    const template = Settings_1.Settings.view.advanced.customStatus;
                    const fullStatus = this.applyTemplate(template, mergedText, line, playbackState, i, lines.length);
                    if (cpFitsIn(fullStatus, 128)) {
                        statusText = fullStatus;
                    } else {
                        const reducedLines = lyricLines.slice();
                        let fitted = false;
                        while (reducedLines.length > 1) {
                            reducedLines.pop();
                            const candidate = this.applyTemplate(template, reducedLines.join(" "), line, playbackState, i, lines.length);
                            if (cpFitsIn(candidate, 128)) { statusText = candidate; fitted = true; break; }
                        }
                        if (!fitted) {
                            statusText = this.smartTruncate(
                                this.applyTemplate(template, lyricLines[0], line, playbackState, i, lines.length), 128, null
                            );
                        }
                    }
                    emoji = Settings_1.Settings.view.advanced.customEmoji;
                } else {
                    const prefix = `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}`;
                    const cleanedLines = lyricLines.map(l => l.replace(/\u266a/g, "\uD83C\uDFB6"));
                    const limit = 128 - cpLen(prefix);
                    const reduced = cleanedLines.slice();
                    while (reduced.length > 1 && !cpFitsIn(reduced.join(" "), limit)) reduced.pop();
                    const lyricsText = cpFitsIn(reduced.join(" "), limit)
                        ? reduced.join(" ")
                        : this.smartTruncate(reduced[0], limit, null);
                    statusText = prefix + lyricsText;
                    emoji = "\uD83C\uDFB6";
                }

                if (statusText === this._lastSentText) {
                    for (const ml of mergedLines) this.sentLines.add(ml);
                    break;
                }
                if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
                playbackState.currentLine = line;
                this._lastSentAt = now;
                this._lastSentText = statusText;
                Debug_1.Debug.write(`[StatusChanger] Queuing status (${mergedLines.length} line(s) merged): "${statusText}"`);
                this._lastMergedLines = mergedLines;
                // Bug 5 fix: rebuild sentLines from existing valid refs + new ones, capped at 200
                for (const ml of mergedLines) this.sentLines.add(ml);
                if (this.sentLines.size > 200) {
                    const arr = [...this.sentLines];
                    // Retain currentLine ref in trimmed set to preserve === check correctness
                    this.sentLines = new Set(arr.slice(-200));
                    if (line && !this.sentLines.has(line)) this.sentLines.add(line);
                }
                if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: statusText, em: emoji };
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji, mergedLines, line);
                break;
            }
        }
    }

    songChanged(isEnd = false) {
        this.sentLines = new Set(); this._lastMergedLines = null; this._lastSentAt = Date.now();
        if (isEnd && Settings_1.Settings.restore.enabled && this._savedStatus) {
            if (this._restoreTimer) clearTimeout(this._restoreTimer);
            this._iOSSyncPending = null;
            const delayMs = Settings_1.Settings.restore.delayMs || 15000;
            this._restoreTimer = setTimeout(() => { this._restoreTimer = null; this.restoreStatus(); }, delayMs);
            Debug_1.Debug.write('[StatusChanger] Song ended - will restore status in ' + delayMs + 'ms');
        } else if (!isEnd) {
            if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; Debug_1.Debug.write('[StatusChanger] New song - restore timer cancelled'); }
            if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: null, em: null };
        }
    }

    formatSeconds(s) {
        const m = Math.floor(s / 60), sec = s % 60;
        return m + (sec < 10 ? ':0' : ':') + sec;
    }
}
exports.StatusChanger = StatusChanger;
