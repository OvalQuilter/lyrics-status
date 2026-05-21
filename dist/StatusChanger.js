"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
const StatusChangerBase_1 = require("./StatusChangerBase");

const { VALID_FLASH_STATES, applyUnicodeStyle, resolveUnicodeStyle, cpLen, sanitizeLyric } = StatusChangerBase_1;

class StatusChanger extends StatusChangerBase_1.StatusChangerBase {

    _flashSend(status, label) {
        const usingGateway = Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        if (usingGateway) { this._gateway.flashPresence(status, null, null); return; }
        this._discordPatch({ status })
            .then(res => { if (res.status !== 200) res.text().then(b => Debug_1.Debug.write("[StatusFlash] " + label + " HTTP " + res.status + ": " + b)).catch(() => {}); })
            .catch(e => Debug_1.Debug.write("[StatusFlash] " + label + " error: " + e));
    }

    _flashTick() {
        if (!this._flashActive) return;
        const sf = Settings_1.Settings.statusFlash;
        if (!sf || !sf.enabled) { this._stopFlash(false); return; }
        const states = Array.isArray(sf.states) && sf.states.length
            ? sf.states.filter(s => VALID_FLASH_STATES.has(s))
            : ["online", "idle", "dnd"];
        if (!states.length) return;
        this._flashIndex = (this._flashIndex + 1) % states.length;
        this._flashSend(states[this._flashIndex], "REST flash");
    }

    _startFlash() {
        const sf = Settings_1.Settings.statusFlash;
        if (!sf || !sf.enabled || this._flashActive) return;
        const intervalMs = Math.max(typeof sf.intervalMs === "number" ? sf.intervalMs : 500, 300);
        this._flashActive = true; this._flashIndex = 0;
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
        this._flashSend(base, "Restore");
    }

    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.isPlaying) {
            this._stopFlash(true);
            return;
        }
        // No lyrics — send song name as status
        if (!playbackState.hasLyrics || !playbackState.lyrics) {
            this._stopFlash(false);
            const songText = playbackState.songName || "";
            if (songText && songText !== this._lastSentText) {
                this._lastSentText = songText;
                const adv = Settings_1.Settings.view.advanced;
                const emoji = (adv && adv.enabled && adv.customEmoji) ? adv.customEmoji : null;
                this.changeStatusRequest(songText, Settings_1.Settings.credentials.token, emoji, null, null);
            }
            return;
        }
        const lyrics = playbackState.lyrics;
        this._startFlash();

        const now = Date.now();
        const adv = Settings_1.Settings.view.advanced;

        let _styleBucketChanged = false;
        if (adv.styleAlternateEnabled) {
            const b = Math.floor(now / (adv.styleAlternateIntervalMs > 0 ? adv.styleAlternateIntervalMs : 3000));
            if (b !== this._lastStyleBucket) { this._lastStyleBucket = b; _styleBucketChanged = true; }
            // FIX: don't clear _lastSentText - TUI reads it and would show blank for up to 1s
        }

        const { style: _uStyle } = resolveUnicodeStyle(adv, now);
        const _style = s => _uStyle !== "none" ? applyUnicodeStyle(s, _uStyle) : s;

        const usingGateway = Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        const { enableBackoff, enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs } = Settings_1.Settings.rateLimit;
        if (!usingGateway && enableBackoff && now < this._rateLimitedUntil) return;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        if (!usingGateway && minInterval > 0 && now - this._lastSentAt < minInterval) return;
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
                if (!line.text) { if (!this.sentLines.has(line)) this.sentLines.add(line); continue; }
                if (nextLine && nextLine.time < (songProgress + offset)) {
                    if (!this.sentLines.has(line)) this.sentLines.add(line);
                    continue;
                }
                if (this.sentLines.has(line) && (!_styleBucketChanged || this._lastAnchorLine !== line)) break;

                let mergedText, lyricLines, mergedLines;
                if (mergeWindow === 0) {
                    const mt = sanitizeLyric(line.text || "");
                    mergedText = mt; lyricLines = [mt]; mergedLines = [line];
                } else {
                    ({ mergedText, lyricLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindow, _styleBucketChanged || usingGateway));
                }

                let statusText, emoji;

                if (adv.enabled) {
                    const template = adv.customStatus;
                    const fullStatus = this.applyTemplate(template, _style(mergedText), line, playbackState, i, lines.length);
                    if (cpLen(fullStatus) <= 128) {
                        statusText = fullStatus;
                    } else {
                        const reducedLines = lyricLines.slice();
                        let fitted = false;
                        while (reducedLines.length > 1) {
                            reducedLines.pop();
                            const candidate = this.applyTemplate(template, _style(reducedLines.join(" ")), line, playbackState, i, lines.length);
                            if (cpLen(candidate) <= 128) { statusText = candidate; fitted = true; break; }
                        }
                        if (!fitted) statusText = this.smartTruncate(this.applyTemplate(template, _style(lyricLines[0]), line, playbackState, i, lines.length), 128, null);
                    }
                    emoji = adv.customEmoji;
                } else {
                    const prefix = `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}`;
                    const limit = 128 - cpLen(prefix);
                    const reduced = lyricLines.slice();
                    while (reduced.length > 1 && cpLen(reduced.join(" ")) > limit) reduced.pop();
                    const displayReduced = reduced.map((l, idx) => idx === 0 ? l : (reduced[idx - 1].match(/[.!?]\s*$/) ? l : l.charAt(0).toLowerCase() + l.slice(1)));
                    const lyricsText = cpLen(displayReduced.join(" ")) <= limit ? displayReduced.join(" ") : this.smartTruncate(displayReduced[0], limit, null);
                    statusText = prefix + _style(lyricsText);
                    emoji = "\uD83C\uDFB6";
                }

                if (statusText === this._lastSentText && !_styleBucketChanged) { break; }
                if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
                playbackState.currentLine = line;
                this._lastAnchorLine = line;
                this._lastSentAt = now;
                this._lastSentText = statusText;
                Debug_1.Debug.write(`[StatusChanger] Queuing status (${mergedLines.length} line(s) merged): "${statusText}"`);
                this._lastMergedLines = mergedLines;
                for (const ml of mergedLines) { this.sentLines.add(ml); this._staleLines.delete(ml); }
                if (this.sentLines.size > 200) {
                    const arr = [...this.sentLines].slice(-200);
                    this.sentLines = new Set(arr);
                    this._staleLines = new Set([...this._staleLines].filter(l => this.sentLines.has(l)));
                    for (const ml of mergedLines) { if (!this.sentLines.has(ml)) this.sentLines.add(ml); }
                }
                if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: statusText, em: emoji };
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji, mergedLines, line);
                break;
            }
        }
    }

    songChanged(isEnd = false) {
        this.sentLines = new Set(); this._staleLines = new Set(); this._lastMergedLines = null; this._lastAnchorLine = null; this._lastSentAt = 0;
        this._lastStyleBucket = -1;
        this.playbackState.currentLine = null;
        if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
        this._stopFlash(isEnd);
        if (isEnd) {
            if (this._gateway) this._gateway.clearLastActivity();
            if (Settings_1.Settings.restore.enabled && this._savedStatus) {
                this._iOSSyncPending = null;
                const delayMs = Settings_1.Settings.restore.delayMs || 15000;
                this._restoreTimer = setTimeout(() => { this._restoreTimer = null; this.restoreStatus(); }, delayMs);
                Debug_1.Debug.write('[StatusChanger] Song ended - will restore status in ' + delayMs + 'ms');
            }
        } else {
            Debug_1.Debug.write('[StatusChanger] New song - restore timer cancelled');
            this._iOSSyncPending = { t: null, em: null };
        }
    }
}
exports.StatusChanger = StatusChanger;
