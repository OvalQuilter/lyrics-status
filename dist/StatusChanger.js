"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
const StatusChangerBase_1 = require("./StatusChangerBase");

const { VALID_FLASH_STATES, applyUnicodeStyle, resolveUnicodeStyle, cpLen, sanitizeLyric } = StatusChangerBase_1;

// Convert Spotify CDN URL to spotify: image key format accepted by Discord op3 activities
// https://i.scdn.co/image/<hash> → spotify:<hash>
function _toSpotifyImageKey(url) {
    if (!url) return null;
    const m = url.match(/\/image\/([a-f0-9]+)$/i);
    return m ? `spotify:${m[1]}` : null;
}

class StatusChanger extends StatusChangerBase_1.StatusChangerBase {

    _flashSend(status, label) {
        const usingGateway = Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        if (usingGateway) { this._gateway.flashPresence(status, null, null); return; }
        if (Date.now() < this._rateLimitedUntil) { Debug_1.Debug.write("[StatusFlash] Skipping — rate limited (RL-09)"); return; } // RL-09
        this._discordPatch({ status })
            .then(res => {
                if (res.status === 429) {
                    res.text().then(raw => { let ra=5; try{const b=JSON.parse(raw);if(typeof b.retry_after==='number'&&b.retry_after>0)ra=Math.min(Math.max(b.retry_after,5),300);}catch(_){} this._rateLimitedUntil=Date.now()+ra*1000; Debug_1.Debug.write("[StatusFlash] 429 — stopping flash, backing off "+ra+"s (RL-09)"); this._stopFlash(false); }).catch(()=>{});
                } else if (res.status !== 200) { res.text().then(b => Debug_1.Debug.write("[StatusFlash] " + label + " HTTP " + res.status + ": " + b)).catch(() => {}); }
            })
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

    _buildRichPresence(line, ps) {
        const rp = Settings_1.Settings.richPresence;
        if (!rp || !rp.enabled) return null;
        const details = this.applyTemplate(rp.detailsTemplate || "{lyrics}", sanitizeLyric(line.text || ""), line, ps, null, null);
        const state   = this.applyTemplate(rp.stateTemplate   || "{song_author}", sanitizeLyric(line.text || ""), line, ps, null, null);
        const activity = {
            type: 2,
            name: rp.appName || "Spotify",
            details: details || undefined,
            state:   state   || undefined,
        };
        if (rp.showProgressBar && ps.songStartEpoch > 0) {
            activity.timestamps = { start: ps.songStartEpoch, end: ps.songStartEpoch + (ps.songDuration || 0) };
        }
        if (rp.showAlbumArt) {
            // Use override URL if set, otherwise auto-convert Spotify CDN URL to spotify: key
            const imageUrl = rp.albumArtUrl || ps.albumArtUrl;
            const imageKey = _toSpotifyImageKey(imageUrl) || imageUrl || null;
            if (imageKey) activity.assets = { large_image: imageKey, small_text: ps.lyricsSource || undefined };
        }
        if (rp.buttonLabel && rp.buttonUrl) {
            activity.buttons = [{ label: rp.buttonLabel, url: rp.buttonUrl }];
        }
        return activity;
    }

    changeStatus() {
        this.autooffset.setLimit(Settings_1.Settings.timings.autooffset);
        const playbackState = this.playbackState;
        if (playbackState.ended || !playbackState.isPlaying) {
            this._stopFlash(true);
            return;
        }
        if (!playbackState.hasLyrics || !playbackState.lyrics) {
            this._stopFlash(false);
            const songText = playbackState.songName || "";
            if (songText && songText !== this._lastSentText) {
                const _now2 = Date.now();
                const _eff2 = Settings_1.Settings.gateway?.enabled && this._gateway?.connected ? (Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000) : (Settings_1.Settings.rateLimit.enableMinInterval ? (Settings_1.Settings.rateLimit.minIntervalMs || 5000) : 0);
                if (_now2 < this._rateLimitedUntil) return; // RL-10
                if (_eff2 > 0 && _now2 - this._lastSentAt < _eff2) return; // RL-10
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
        }

        const { style: _uStyle } = resolveUnicodeStyle(adv, now);
        const _style = s => _uStyle !== "none" ? applyUnicodeStyle(s, _uStyle) : s;

        const usingGateway = Settings_1.Settings.gateway?.enabled && this._gateway && this._gateway.connected; // CONN-07
        const { enableBackoff, enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs } = Settings_1.Settings.rateLimit;
        if (!usingGateway && enableBackoff && now < this._rateLimitedUntil) return;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        const effectiveInterval = usingGateway ? (Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000) : minInterval;
        if (effectiveInterval > 0 && now - this._lastSentAt < effectiveInterval) return;
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
                    const _sep = Settings_1.Settings.rateLimit?.mergeSeparator ?? " ";
                    const reduced = lyricLines.slice();
                    while (reduced.length > 1 && cpLen(reduced.join(_sep)) > limit) reduced.pop();
                    const displayReduced = reduced.map((l, idx) => idx === 0 ? l : (reduced[idx - 1].match(/[.!?]\s*$/) ? l : l.charAt(0).toLowerCase() + l.slice(1)));
                    const lyricsText = cpLen(displayReduced.join(_sep)) <= limit ? displayReduced.join(_sep) : this.smartTruncate(displayReduced[0], limit, null);
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
                    const arr = [...this.sentLines].slice(-200); // CONN-36: mergedLines guaranteed in last 200
                    this.sentLines = new Set(arr);
                    this._staleLines = new Set([...this._staleLines].filter(l => this.sentLines.has(l)));
                }
                if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: statusText, em: emoji };
                if (usingGateway && this._gateway) {
                    this._gateway._lastRichPresenceActivity = this._buildRichPresence(line, playbackState);
                }
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji, mergedLines, line);
                // Clear GW status after last lyric line
                const _isLastLine = !lines.slice(i + 1).some(l => l.text);
                if (_isLastLine && usingGateway && this._gateway) {
                    const _clearDelay = Settings_1.Settings.gateway?.clearAfterLastLineMs ?? 3000;
                    if (_clearDelay > 0) {
                        if (this._lastLineClearTimer) { clearTimeout(this._lastLineClearTimer); this._lastLineClearTimer = null; }
                        this._lastLineClearTimer = setTimeout(() => {
                            this._lastLineClearTimer = null;
                            if (!this.playbackState.isPlaying || this.playbackState.ended) return;
                            if (this._gateway && this._gateway.connected) {
                                Debug_1.Debug.write('[StatusChanger] Last line — clearing GW status after ' + _clearDelay + 'ms');
                                this._gateway.setCustomStatus('', null);
                                this._lastSentText = '';
                            }
                        }, _clearDelay);
                    }
                }
                break;
            }
        }
    }

    songChanged(isEnd = false) {
        this.sentLines = new Set(); this._staleLines = new Set(); this._lastMergedLines = null; this._lastAnchorLine = null;
        if (this._lastLineClearTimer) { clearTimeout(this._lastLineClearTimer); this._lastLineClearTimer = null; }
        if (Date.now() >= this._rateLimitedUntil) this._lastSentAt = 0; // RL-11: preserve lastSentAt during active rate-limit window
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
