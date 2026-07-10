
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
const StatusChangerBase_1 = require("./StatusChangerBase");

const { VALID_FLASH_STATES, applyUnicodeStyle, resolveUnicodeStyle, cpLen, sanitizeLyric, applyWordStyles, applyCharStyles, moodHeart } = StatusChangerBase_1;

function _toSpotifyImageKey(url) {
    if (!url) return null;
    const m = url.match(/\/image\/([a-f0-9]+)$/i);
    return m ? `spotify:${m[1]}` : null;
}

class StatusChanger extends StatusChangerBase_1.StatusChangerBase {

    _flashSend(status, label) {
        const usingGateway = Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled && this._gateway && this._gateway.connected;
        if (usingGateway) { this._gateway.flashPresence(status, null, null); return; }
        if (Date.now() < this._rateLimitedUntil || Date.now() < this._globalLimitedUntil) { Debug_1.Debug.write("[StatusFlash] Skipping — rate limited (RL-09)"); return; }
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
        this._flashSessionStartedAt = Date.now();
        // Cap continuous flashing to a human-plausible burst (45-90s), not the whole song
        this._flashSessionMaxMs = 45000 + Math.random() * 45000;
        Debug_1.Debug.write("[StatusFlash] Starting @ ~" + intervalMs + "ms (jittered, session cap " + Math.round(this._flashSessionMaxMs/1000) + "s)");
        this._scheduleFlashTick(intervalMs);
    }

    _scheduleFlashTick(baseIntervalMs) {
        if (!this._flashActive) return;
        // Jitter each tick by ±35% so spacing is never perfectly even
        const jitterFactor = 0.65 + Math.random() * 0.7;
        let delay = Math.max(250, Math.round(baseIntervalMs * jitterFactor));
        // Occasionally insert a longer human-like pause (distracted, looked away)
        if (Math.random() < 0.12) delay += 800 + Math.random() * 2200;
        this._flashTimer = setTimeout(() => {
            this._flashTimer = null;
            if (!this._flashActive) return;
            const elapsed = Date.now() - (this._flashSessionStartedAt || 0);
            if (elapsed >= (this._flashSessionMaxMs || 60000)) {
                Debug_1.Debug.write("[StatusFlash] Session cap reached — pausing flash");
                this._stopFlash(false);
                return;
            }
            this._flashTick();
            this._scheduleFlashTick(baseIntervalMs);
        }, delay);
    }

    _stopFlash(restorePresence) {
        const wasActive = this._flashActive;
        this._flashActive = false;
        if (this._flashInterval) { clearInterval(this._flashInterval); this._flashInterval = null; }
        if (this._flashTimer) { clearTimeout(this._flashTimer); this._flashTimer = null; }
        if (this._gateway) this._gateway.clearFlashStatus();
        if (!restorePresence || !wasActive) return;
        const sf = Settings_1.Settings.statusFlash;
        const _rawBase = (sf && sf.restoreStatus) || (Settings_1.Settings.gateway && Settings_1.Settings.gateway.presenceStatus) || "online";
        const base = (_rawBase === "mobile" || _rawBase === "off") ? "online" : _rawBase;
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
            id: this._rpActivityId || "0",
            type: 2,
            name: rp.appName || "Spotify",
            details: details || undefined,
            state:   state   || undefined,
            created_at: ps.songStartEpoch || Date.now(),
        };
        if (rp.applicationId) activity.application_id = rp.applicationId;
        if (rp.showProgressBar && ps.songStartEpoch > 0) {
            activity.timestamps = { start: ps.songStartEpoch, end: ps.songStartEpoch + (ps.songDuration || 0) };
        }
        if (rp.showAlbumArt) {
            const imageUrl = rp.albumArtUrl || ps.albumArtUrl;
            const imageKey = _toSpotifyImageKey(imageUrl) || imageUrl || null;
            if (imageKey) { const _imgKey = imageKey.startsWith("spotify:") || imageKey.startsWith("mp:") ? imageKey : "mp:" + imageKey; activity.assets = { large_image: _imgKey, large_text: ps.songName || undefined, small_image: rp.smallImage || undefined, small_text: ps.lyricsSource || undefined }; }
        }
        if (rp.buttonLabel && rp.buttonUrl) {
            activity.buttons = [{ label: rp.buttonLabel, url: rp.buttonUrl }];
        }
        const sp = Settings_1.Settings.spotifyParty;
        if (false) { // DISABLED
            const partyId = sp.partyId || ("ls-" + (ps.songId || "party"));
            const size    = Math.max(1, sp.partySize || 1);
            const max     = Math.max(size, sp.partyMax || 10);
            activity.party   = { id: partyId, size: [size, max] };
            activity.sync_id = sp.syncId || ps.songId || undefined;
            activity.flags   = typeof sp.flags === "number" ? sp.flags : 48;
            Debug_1.Debug.write(`[SpotifyParty] party=${partyId} size=${size}/${max} sync_id=${activity.sync_id} flags=${activity.flags}`);
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
                if (_now2 < this._rateLimitedUntil) return;
                if (_eff2 > 0 && _now2 - this._lastSentAt < _eff2) return;
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

        const { style: _uStyle, bucket: _styleBucket } = resolveUnicodeStyle(adv, now);
        const _swm = adv.styleWordMap ? adv.styleWordMap.split(",").map(x=>x.trim()).filter(Boolean) : null;
        const _marqueeOn = !!(adv.styleWordMapMarquee && _swm && _swm.length);
        const _marqueeBucket = _marqueeOn ? Math.floor(now / (adv.styleAlternateIntervalMs > 0 ? adv.styleAlternateIntervalMs : 3000)) : -1;
        const _marqueeChanged = _marqueeOn && _marqueeBucket !== this._lastMarqueeBucket;
        if (_marqueeChanged) this._lastMarqueeBucket = _marqueeBucket;
        const _styleBucketChanged = (!(_swm && _swm.length) && _styleBucket !== -1 && _styleBucket !== this._lastStyleBucket) || _marqueeChanged;
        if (!(_swm && _swm.length)) this._lastStyleBucket = _styleBucket;
        const _scm = adv.styleCharMap ? adv.styleCharMap.split(",").map(x=>x.trim()).filter(Boolean) : null;
        const _br = adv.lyricsBrackets ? adv.lyricsBrackets.split(",") : null;
        const _wrap = s => _br ? (_br[0]||"")+s+(_br[1]||"") : s;
        const _style = s => _wrap(_scm&&_scm.length ? applyCharStyles(s,_scm,(this._wordStyleCursor||0)+(_marqueeOn?_marqueeBucket:0)) : _swm&&_swm.length ? applyWordStyles(s,_swm,(this._wordStyleCursor||0)+(_marqueeOn?_marqueeBucket:0)) : (_uStyle!=="none"?applyUnicodeStyle(s,_uStyle):s));

        const usingGateway = Settings_1.Settings.gateway?.enabled && this._gateway && this._gateway.connected;
        const { enableBackoff, enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs } = Settings_1.Settings.rateLimit;
        if (!usingGateway && enableBackoff && now < this._rateLimitedUntil) return;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        const _mergeFloor = enableMergeLines ? (mergeWindowMs || 0) : 0;
        const effectiveInterval = Math.max(usingGateway ? (Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000) : minInterval, _mergeFloor);
        const _jitteredFloor = effectiveInterval + (this._sendJitterMs || 0); // additive-only â€” never reduces the real floor
        if (_jitteredFloor > 0 && now - this._lastSentAt < _jitteredFloor) return;
        const songProgress = playbackState.songProgress;
        const lines = lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset
            ? this.autooffset.getMedianValue() + 100
            : (Settings_1.Settings.timings.sendTimeOffset || 0);
if (this._lastProgressSeen != null && songProgress < this._lastProgressSeen - 2000) this._scanIndex = 0;
        this._lastProgressSeen = songProgress;
        for (let i = this._scanIndex||0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            if (line.time < (songProgress + offset)) {
                this._scanIndex = i;
                if (!line.text) { if (!this.sentLines.has(line)) this.sentLines.add(line); continue; }
                if (nextLine && nextLine.time < (songProgress + offset) && (songProgress + offset - line.time) > 3000) {
                    if (!this.sentLines.has(line)) { this.sentLines.add(line); this._staleLines.add(line); if (!this._catchupStaleLines) this._catchupStaleLines = new Set(); this._catchupStaleLines.add(line); }
                    continue;
                }
                const _inRollback = this._rollbackLines && this._rollbackLines.has(line);
                if (this.sentLines.has(line) && !this._staleLines.has(line) && !_inRollback && (!_styleBucketChanged || this._lastAnchorLine !== line)) break;

                const _isNewAnchor = this._lastAnchorLine !== line;
                if (_isNewAnchor) { this._rollbackLines = new Set(); this._staleLines = new Set([...this._staleLines].filter(sl => sl.time > line.time)); this._lastAnchorAdvanceAt = now; } // B2: drop past stale entries only; keep future forward-merged lines

                // PERF-1: moved off the per-tick hot path -- only computed when a line is actually
                // about to be sent (anchor advance or style-bucket resend), not on every changeStatus() poll.
                const _denseCount = lines.slice(this._scanIndex||0).filter(l => l.text && l.time >= songProgress+offset && l.time < songProgress+offset+20000).length;
                const _staticWindow = _denseCount > 5 ? Math.max(mergeWindowMs || 8000, 5000) : (mergeWindowMs || 8000);
                // When _lastSentAt===0 (first line of song / after song change), use the full static window
                // instead of 0 so the first anchor can still pull in neighbors.
                const mergeWindow = enableMergeLines
                    ? (_isNewAnchor ? _staticWindow : Math.min(this._lastAnchorAdvanceAt > 0 ? now - this._lastAnchorAdvanceAt : _staticWindow, _staticWindow))
                    : 0;

                let mergedText, lyricLines, joinedLines, mergedLines, forwardLines;
                if (mergeWindow === 0) {
                    const mt = sanitizeLyric(line.text || "");
                    mergedText = mt; lyricLines = [mt]; joinedLines = [mt]; mergedLines = [line]; forwardLines = null;
                } else {
                    let _maxLines = Settings_1.Settings.rateLimit?.mergeMaxLines;
                    _maxLines = (Number.isFinite(_maxLines) && _maxLines > 0) ? Math.floor(_maxLines) : 0;
                    ({ forwardLines, mergedText, lyricLines, joinedLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindow, _styleBucketChanged, _maxLines, _staticWindow));
                }

                let statusText, emoji, _actualLineCount = mergedLines.length;

                if (adv.enabled) {
                    const template = adv.customStatus;
                    const fullStatus = this.applyTemplate(template, mergedText, line, playbackState, i, lines.length, _style);
                    if (cpLen(fullStatus) <= 128) {
                        statusText = fullStatus;
                    } else {
                        const reducedLines = lyricLines.slice();
                        let fitted = false;
                        while (reducedLines.length > 1) {
                            reducedLines.pop();
                            const candidate = this.applyTemplate(template, reducedLines.join(Settings_1.Settings.rateLimit?.mergeSeparator ?? " "), line, playbackState, i, lines.length, _style);
                            if (cpLen(candidate) <= 128) { statusText = candidate; fitted = true; _actualLineCount = reducedLines.length; break; }
                        }
                        if (!fitted) { statusText = this.smartTruncate(this.applyTemplate(template, lyricLines[0], line, playbackState, i, lines.length, _style), 128, null); _actualLineCount = 1; }
                    }
                    if(adv.moodHeartsEnabled){const _mh=moodHeart(mergedText);if(_mh){this._lastMoodHeart=_mh;this._lastMoodHeartAt=now;}emoji=(this._lastMoodHeart&&(now-this._lastMoodHeartAt<15000)?this._lastMoodHeart:null)||adv.customEmoji;}else{emoji=adv.customEmoji;}
                } else {
                    const prefix = `${Settings_1.Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings_1.Settings.view.label ? "Song lyrics - " : ""}`;
                    const styledLimit = 128 - cpLen(prefix);
                    const _sep = Settings_1.Settings.rateLimit?.mergeSeparator ?? " ";
                    const reduced = joinedLines.slice();
                    while (reduced.length > 1 && cpLen(_style(reduced.join(_sep))) > styledLimit) reduced.pop();
                    const _rawJoined = reduced.join(_sep);
                    const _styledLyrics = _style(_rawJoined);
                    const lyricsText = cpLen(_styledLyrics) <= styledLimit ? _styledLyrics : this.smartTruncate(_styledLyrics, styledLimit, null);
                    _actualLineCount = reduced.length;
                    statusText = prefix + lyricsText;
                    if(adv.moodHeartsEnabled){const _mh=moodHeart(_rawJoined);if(_mh){this._lastMoodHeart=_mh;this._lastMoodHeartAt=now;}emoji=(this._lastMoodHeart&&(now-this._lastMoodHeartAt<15000)?this._lastMoodHeart:null)||"\uD83C\uDFB6";}else{emoji="\uD83C\uDFB6";}
                }

                if (statusText === this._lastSentText && !_styleBucketChanged) { break; }
                if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
                playbackState.currentLine = line;
                this._lastAnchorLine = line;
                this._lastSentAt = now;
                this._sendJitterMs = effectiveInterval > 0 ? Math.random() * 0.15 * effectiveInterval : 0;
                this._lastSentText = statusText;
                if (_scm&&_scm.length) this._wordStyleCursor=((this._wordStyleCursor||0)+lyricLines.join("").replace(/\s/g,"").length)%_scm.length;
                else if (_swm&&_swm.length) this._wordStyleCursor=((this._wordStyleCursor||0)+lyricLines.join(" ").split(/\s+/).filter(Boolean).length)%_swm.length;
                if (_actualLineCount < mergedLines.length) Debug_1.Debug.write(`[StatusChanger] ${mergedLines.length} lines merged but truncated to ${_actualLineCount} to fit 128 chars`);
                Debug_1.Debug.write(`[StatusChanger] Queuing status (${_actualLineCount} line(s) sent): "${statusText}"`);
                this._lastMergedLines = mergedLines;
                for (const ml of mergedLines) {
                    if (forwardLines && forwardLines.has(ml)) {
                        // Forward-merged: mark stale so line can still fire as anchor when its time comes
                        this.sentLines.add(ml); this._staleLines.add(ml);
                    } else {
                        this.sentLines.add(ml); this._staleLines.delete(ml);
                    }
                    if(this._rollbackLines)this._rollbackLines.delete(ml);
                    if(this._catchupStaleLines)this._catchupStaleLines.delete(ml);
                }
                if (this.sentLines.size > 200) {
                    const arr = [...this.sentLines].slice(-200);
                    const dropped = [...this.sentLines].slice(0, this.sentLines.size - 200);
                    this.sentLines = new Set(arr);
                    for (const d of dropped) this._staleLines.add(d);
                    this._staleLines = new Set([...this._staleLines].filter(l => this.sentLines.has(l)));
                if (this._catchupStaleLines && this._catchupStaleLines.size > 100) { this._catchupStaleLines = new Set([...this._catchupStaleLines].slice(-100)); }
                }
                if (Settings_1.Settings.gateway && Settings_1.Settings.gateway.enabled) this._iOSSyncPending = { t: statusText, em: emoji };
                if (usingGateway && this._gateway) {
                    const _rp = this._buildRichPresence(line, playbackState);
                    const _rpKey = _rp ? JSON.stringify(_rp) : "";
                    if (_rpKey !== this._lastRpKey) { this._lastRpKey = _rpKey; this._gateway._lastRichPresenceActivity = _rp; this._gateway._lastPayloadKey = ""; }
                }
                this.changeStatusRequest(statusText, Settings_1.Settings.credentials.token, emoji, mergedLines, line);
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
        this.sentLines = new Set(); this._staleLines = new Set(); this._rollbackLines = new Set(); this._lastMergedLines = null; this._lastAnchorLine = null; this._lastAnchorAdvanceAt = 0; this._catchupStaleLines = new Set(); this._wordStyleCursor = 0; this._lastMarqueeBucket = -1; this._scanIndex = 0; this._lastProgressSeen = null;
        this._rpActivityId = require("crypto").randomBytes(8).toString("hex"); this._lastRpKey = "";
        if (this._lastLineClearTimer) { clearTimeout(this._lastLineClearTimer); this._lastLineClearTimer = null; }
        if (Date.now() >= this._rateLimitedUntil) this._lastSentAt = 0;
        this._lastStyleBucket = -1;
        this.playbackState.currentLine = null;
        if (this._restoreTimer) { clearTimeout(this._restoreTimer); this._restoreTimer = null; }
        this._stopFlash(isEnd);
        if (isEnd) {
            this._lastColorSongId = null;
            if (this._gateway) this._gateway.clearLastActivity();
            if (Settings_1.Settings.restore.enabled && this._savedStatus) {
                this._iOSSyncPending = null;
                const delayMs = Settings_1.Settings.restore.delayMs || 15000;
                this._restoreTimer = setTimeout(() => { this._restoreTimer = null; this.restoreStatus(); }, delayMs);
                Debug_1.Debug.write('[StatusChanger] Song ended - will restore status in ' + delayMs + 'ms');
            } else if (this._lastSentText) {
                this.changeStatusRequest('', Settings_1.Settings.credentials.token, null, null, null);
                this._lastSentText = '';
                Debug_1.Debug.write('[StatusChanger] Song ended - cleared REST status (no restore)');
            }
        } else {
            Debug_1.Debug.write('[StatusChanger] New song - restore timer cancelled');
            this._lastSentText = "";
            this._iOSSyncPending = { t: null, em: null };
            this.updateProfileColor();
        }
    }
}
exports.StatusChanger = StatusChanger;
