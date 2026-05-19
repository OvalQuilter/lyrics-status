"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
const StatusChangerBase_1 = require("./StatusChangerBase");

const { VALID_FLASH_STATES, applyUnicodeStyle, resolveUnicodeStyle, cpLen, sanitizeLyric } = StatusChangerBase_1;

class StatusChanger extends StatusChangerBase_1.StatusChangerBase {

    // == Status Flash ==========================================================

    _flashTick() {
        if (!this._flashActive) return;
        const sf = Settings_1.Settings.statusFlash;
        if (!sf || !sf.enabled) { this._stopFlash(false); return; }
        const states = Array.isArray(sf.states) && sf.states.length
            ? sf.states.filter(s => VALID_FLASH_STATES.has(s))
            : ["online", "idle", "dnd"];
        if (!states.length) return;
        this._flashIndex = (this._flashIndex + 1) % states.length;
        const status = states[this._flashIndex];
        const usingGateway = Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        if (usingGateway) {
            this._gateway.flashPresence(status, null, null);
        } else {
            this._discordPatch({ status })
                .then(res => { if (res.status !== 200) res.text().then(b => Debug_1.Debug.write("[StatusFlash] REST flash HTTP " + res.status + ": " + b)).catch(() => {}); })
                .catch(e => Debug_1.Debug.write("[StatusFlash] REST flash error: " + e));
        }
    }

    _startFlash() {
        const sf = Settings_1.Settings.statusFlash;
        if (!sf || !sf.enabled || this._flashActive) return;
        const intervalMs = Math.max(typeof sf.intervalMs === "number" ? sf.intervalMs : 2000, 2000);
        this._flashActive = true;
        this._flashIndex = 0;
        Debug_1.Debug.write("[StatusFlash] Starting @ " + intervalMs + "ms");
        this._flashInterval = setInterval(() => this._flashTick(), intervalMs);
    }

    _stopFlash(restorePresence) {
        const wasActive = this._flashActive;
        this._flashActive = false;
        if (this._flashInterval) { clearInterval(this._flashInterval); this._flashInterval = null; }
        if (this._gateway) this._gateway.clearFlashStatus();
        if (!restorePresence || !wasActive) return;
        const sf = Settings_1.Settings.statusFlash;
        const base = (sf && sf.restoreStatus) || (Settings_1.Settings.gateway && Settings_1.Settings.gateway.presenceStatus) || "online";
        if (!VALID_FLASH_STATES.has(base)) return;
        const now = Date.now();
        if (now - this._flashRestoreSentAt < 2000) return;
        this._flashRestoreSentAt = now;
        Debug_1.Debug.write("[StatusFlash] Restoring presence to " + base);
        const usingGateway = Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        if (usingGateway) {
            this._gateway.flashPresence(base, "", null);
        } else {
            this._discordPatch({ status: base })
                .then(res => { if (res.status !== 200) res.text().then(b => Debug_1.Debug.write("[StatusFlash] Restore HTTP " + res.status + ": " + b)).catch(() => {}); })
                .catch(e => Debug_1.Debug.write("[StatusFlash] Restore error: " + e));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────

    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) {
            this._stopFlash(true);
            return;
        }
        const lyrics = playbackState.lyrics;
        if (!lyrics) { this._stopFlash(true); return; }

        this._startFlash();

        const now = Date.now();
        const adv = Settings_1.Settings.view.advanced;

        // track bucket change before resolving style
        let _styleBucketChanged = false;
        if (adv.styleAlternateEnabled) {
            const intervalMs = adv.styleAlternateIntervalMs > 0 ? adv.styleAlternateIntervalMs : 3000;
            const bucket = Math.floor(now / intervalMs);
            if (bucket !== this._lastStyleBucket) {
                this._lastStyleBucket = bucket;
                // FIX: don't clear _lastSentText — TUI reads it and would show blank for up to 1s
                // _styleBucketChanged flag already bypasses the dedup check below
                _styleBucketChanged = true;
            }
        }

        // pass `now` so resolveUnicodeStyle uses the same timestamp, avoiding bucket desync
        const { style: _uStyle } = resolveUnicodeStyle(adv, now);

        const usingGateway = Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        const { enableBackoff, enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs } = Settings_1.Settings.rateLimit;
        if (!usingGateway && enableBackoff && now < this._rateLimitedUntil) return;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        if (!usingGateway && minInterval > 0 && now - this._lastSentAt < minInterval) return;
        if (usingGateway) {
            const minGwInterval = Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000;
            const times = this._gateway._presenceSentTimes || [];
            if (minGwInterval > 0 && times.length && now - times[times.length - 1] < minGwInterval) return;
            if (times.filter(t => now - t <= 20000).length >= 5) return;
        }

        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : (Settings_1.Settings.timings.sendTimeOffset || 0);

        const mergeWindow = enableMergeLines ? (mergeWindowMs || 8000) : 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (line.time < (songProgress + offset)) {
                if (!line.text) continue;
                if (nextLine && nextLine.time < (songProgress + offset)) {
                    if (!this.sentLines.has(line)) {
                        this.sentLines.add(line);
                        this._staleLines.add(line);
                    }
                    continue;
                }
                // allow resend if style bucket just changed
                if (this.sentLines.has(line) && !_styleBucketChanged) break;

                let mergedText, lyricLines, mergedLines;
                if (mergeWindow === 0) {
                    mergedText = sanitizeLyric(line.text || "");
                    lyricLines = [mergedText];
                    mergedLines = [line];
                } else {
                    ({ mergedText, lyricLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindow, _styleBucketChanged));
                }

                let statusText;
                let emoji;

                if (adv.enabled) {
                    const template = adv.customStatus;
                    const styledMergedText = _uStyle !== "none" ? applyUnicodeStyle(mergedText, _uStyle) : mergedText;
                    const fullStatus = this.applyTemplate(template, styledMergedText, line, playbackState, i, lines.length);
                    if (cpLen(fullStatus) <= 128) {
                        statusText = fullStatus;
                    } else {
                        const reducedLines = lyricLines.slice();
                        let fitted = false;
                        while (reducedLines.length > 1) {
                            reducedLines.pop();
                            const candidate = this.applyTemplate(template, _uStyle !== "none" ? applyUnicodeStyle(reducedLines.join(" "), _uStyle) : reducedLines.join(" "), line, playbackState, i, lines.length);
                            if (cpLen(candidate) <= 128) { statusText = candidate; fitted = true; break; }
                        }
                        if (!fitted) {
                            statusText = this.smartTruncate(
                                this.applyTemplate(template, _uStyle !== "none" ? applyUnicodeStyle(lyricLines[0], _uStyle) : lyricLines[0], line, playbackState, i, lines.length), 128, null
                            );
                        }
                    }
                    emoji = adv.customEmoji;
                } else {
                    const prefix = `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}`;
                    const limit = 128 - cpLen(prefix);
                    const reduced = lyricLines.slice();
                    while (reduced.length > 1 && cpLen(reduced.join(" ")) > limit) reduced.pop();
                    const displayReduced = reduced.map((l, idx) => {
                        if (idx === 0) return l;
                        return reduced[idx - 1].match(/[.!?]\s*$/) ? l : l.charAt(0).toLowerCase() + l.slice(1);
                    });
                    const lyricsText = cpLen(displayReduced.join(" ")) <= limit
                        ? displayReduced.join(" ")
                        : this.smartTruncate(displayReduced[0], limit, null);
                    statusText = prefix + (_uStyle !== "none" ? applyUnicodeStyle(lyricsText, _uStyle) : lyricsText);
                    emoji = "\uD83C\uDFB6";
                }

                if (statusText === this._lastSentText && !_styleBucketChanged) {
                    for (const ml of mergedLines) this.sentLines.add(ml);
                    break;
                }
                if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
                playbackState.currentLine = line;
                this._lastSentAt = now;
                this._lastSentText = statusText;
                Debug_1.Debug.write(`[StatusChanger] Queuing status (${mergedLines.length} line(s) merged): "${statusText}"`);
                this._lastMergedLines = mergedLines;
                for (const ml of mergedLines) {
                    this.sentLines.add(ml);
                    this._staleLines.delete(ml);
                }
                if (this.sentLines.size > 200) {
                    const arr = [...this.sentLines];
                    this.sentLines = new Set(arr.slice(-200));
                    this._staleLines = new Set([...this._staleLines].filter(l => this.sentLines.has(l)));
                    if (line && !this.sentLines.has(line)) this.sentLines.add(line);
                }
                if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: statusText, em: emoji };
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji, mergedLines, line);
                break;
            }
        }
    }

    songChanged(isEnd = false) {
        this.sentLines = new Set(); this._staleLines = new Set(); this._lastMergedLines = null; this._lastSentAt = 0;
        this._lastStyleBucket = -1;
        this.playbackState.currentLine = null;
        this._stopFlash(isEnd);
        if (isEnd) {
            if (Settings_1.Settings.restore.enabled && this._savedStatus) {
                if (this._restoreTimer) clearTimeout(this._restoreTimer);
                this._iOSSyncPending = null;
                const delayMs = Settings_1.Settings.restore.delayMs || 15000;
                this._restoreTimer = setTimeout(() => { this._restoreTimer = null; this.restoreStatus(); }, delayMs);
                Debug_1.Debug.write('[StatusChanger] Song ended - will restore status in ' + delayMs + 'ms');
            }
        } else {
            if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; Debug_1.Debug.write('[StatusChanger] New song - restore timer cancelled'); }
            if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: null, em: null };
        }
    }
}
exports.StatusChanger = StatusChanger;
