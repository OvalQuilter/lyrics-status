"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _nodeVer = process.versions.node.split(".").map(Number);
if (_nodeVer[0] < 17) { console.error("\x1b[31m[lyrics-status] Node.js v" + process.versions.node + " is not supported. Please upgrade to v17 or later.\x1b[0m"); process.exit(1); }
try {
    require("better-sqlite3");
} catch (e) {
    if (e.code === "ERR_DLOPEN_FAILED" || (e.message && e.message.includes("NODE_MODULE_VERSION"))) {
        console.error("\x1b[33m[lyrics-status] Native module mismatch - rebuilding better-sqlite3 for Node.js v" + process.versions.node + "...\x1b[0m");
        const { execSync } = require("child_process");
        try { execSync("npm rebuild better-sqlite3", { stdio: "inherit", cwd: require("path").resolve(__dirname, "..") }); console.log("\x1b[32m[lyrics-status] Rebuild successful - starting...\x1b[0m"); }
        catch (rebuildErr) { console.error("\x1b[31m[lyrics-status] Rebuild failed. Try running 'npm rebuild' manually.\x1b[0m"); process.exit(1); }
    } else { console.error("\x1b[31m[lyrics-status] Failed to load better-sqlite3: " + e.message + "\x1b[0m"); process.exit(1); }
}
const LyricsFetcher_1 = require("./LyricsFetcher");
const CacheStore_1 = require("./CacheStore");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const GatewayClient_1 = require("./GatewayClient");
const SpotifyDealerClient_1 = require("./SpotifyDealerClient");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const ClientIdentity_1 = require("./ClientIdentity");
const Updater_1 = require("./Updater");
const SpotifyService_1 = require("./SpotifyService");
const uuid_1 = require("uuid");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
const path = require("path");
let _store = null;
try { Settings_1.Settings.load(); } catch (e) { console.error("\x1b[31m[lyrics-status] Failed to load settings: " + e.message + "\x1b[0m"); process.exit(1); }
{ const fs=require("fs"),lp=require("path").join(__dirname,"../.lock"); try { if (fs.existsSync(lp)) { const op=parseInt(fs.readFileSync(lp,"utf8"))||0; let alive=false; try{process.kill(op,0);alive=true;}catch(_){} const stale=Date.now()-fs.statSync(lp).mtimeMs>21600000; if(alive&&(!stale||op===process.ppid)){ console.error("\x1b[31m[lyrics-status] Already running (PID "+op+"). Exiting.\x1b[0m"); process.exit(1);} if(stale) console.error("\x1b[33m[lyrics-status] Stale lock ignored (>6h old).\x1b[0m"); } fs.writeFileSync(lp,String(process.pid));
  setInterval(()=>{try{fs.writeFileSync(lp,String(process.pid));}catch(_){}},60000); process.on("exit",()=>{try{if(parseInt(fs.readFileSync(lp,"utf8"))===process.pid)fs.unlinkSync(lp);}catch(_){}}); } catch(_){} }
{ const { existsSync, rmSync } = require("fs"); const _tmp = require("path").join(__dirname, "../temp"); try { if (existsSync(_tmp)) { rmSync(_tmp, { recursive: true, force: true }); Debug_1.Debug.write("[init] Cleaned up leftover temp/ dir"); } } catch (e) { Debug_1.Debug.write("[init] Failed to clean temp/: " + e.message); } }
if (Settings_1.Settings.update.enableAutoupdate) {
    Updater_1.Updater.tryUpdate().catch(e => { Debug_1.Debug.write("LyricsStatus failed to update. Error: " + e.stack); }).finally(() => init());
} else { init(); }
let _tokenValidateRetries = 0;
async function _validateDiscordToken() {
    const token = Settings_1.Settings.credentials.token;
    if (!token) { Debug_1.Debug.write("[init] No Discord token set"); return false; }
    try {
        const res = await fetch("https://discord.com/api/v10/users/@me", { headers: { "Authorization": token, "X-Super-Properties": ClientIdentity_1.ClientIdentity.superProperties(), "User-Agent": ClientIdentity_1.ClientIdentity.userAgent() } });
        if (res.status === 401) { console.error("\x1b[31m[lyrics-status] Discord token is invalid or revoked. Update it in the panel and restart.\x1b[0m"); Debug_1.Debug.write("[init] Token validation failed: 401"); return false; }
        _tokenValidateRetries = 0;
        Debug_1.Debug.write("[init] Token validation HTTP " + res.status + (res.ok ? " OK" : " — proceeding anyway"));
        return true;
    } catch (e) {
        _tokenValidateRetries++;
        if (_tokenValidateRetries < 3) {
            const backoffMs = Math.min(30000, 2000 * Math.pow(2, _tokenValidateRetries - 1));
            Debug_1.Debug.write("[init] Token validation network error (attempt " + _tokenValidateRetries + "/3), retrying in " + backoffMs + "ms: " + e);
            await new Promise(r => setTimeout(r, backoffMs));
            return _validateDiscordToken();
        }
        Debug_1.Debug.write("[init] Token validation failed after 3 attempts (network?) — proceeding anyway: " + e);
        _tokenValidateRetries = 0;
        return true;
    }
}

async function init() {
    if (!Settings_1.Settings.credentials.uuid) { Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)(); Settings_1.Settings.save(); }
    const _tokenValidPromise = _validateDiscordToken();
    ExternalAuthServerAPI_1.ExternalAuthServerAPI.register();
    const useDiscordPresence = !!Settings_1.Settings.credentials.useDiscordPresence;
    if (!useDiscordPresence && Settings_1.Settings.credentials.refreshToken && !Settings_1.Settings.credentials.useExternalAuthServer) {
        await SpotifyService_1.SpotifyService.refresh().catch(e => Debug_1.Debug.write("[init] Initial token refresh failed: " + e));

        const _expiry = Settings_1.Settings.credentials.oauthTokenExpiry || 0;
        if (_expiry > 0) {
            const _refreshIn = Math.max(60000, _expiry - Date.now() - 300000);
            setTimeout(function _proactiveRefresh() { SpotifyService_1.SpotifyService.refresh().catch(() => {}); const exp = Settings_1.Settings.credentials.oauthTokenExpiry || 0; if (exp > 0) setTimeout(_proactiveRefresh, Math.max(60000, exp - Date.now() - 300000)); }, _refreshIn);
        }
    } else if (!useDiscordPresence && Settings_1.Settings.credentials.useExternalAuthServer) {
        SpotifyService_1.SpotifyService.token = (await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken().catch(() => null)) || '';
    }
    const dbPath = Settings_1.Settings.cache.path || path.resolve(__dirname, "../cache/cache.db");
    _store = new CacheStore_1.CacheStore(dbPath);
    const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher(_store);
    const src = Settings_1.Settings.sources;
    const SOURCE_MAP = {Spotify:()=>new (require("./Sources/SpotifySource").SpotifySource)(),Musixmatch:()=>new (require("./Sources/MusixmatchSource").MusixmatchSource)(),LrcLib:()=>new (require("./Sources/LrcLibSource").LrcLibSource)(),NetEase:()=>new (require("./Sources/NetEaseMusicSource").NetEaseMusicSource)(),QQMusic:()=>new (require("./Sources/QQMusicSource").QQMusicSource)(),Genius:()=>new (require("./Sources/GeniusSource").GeniusSource)()};
    const ENABLE_KEY = { Spotify:"enableSpotify", Musixmatch:"enableMusixmatch", LrcLib:"enableLrcLib", NetEase:"enableNetEase", QQMusic:"enableQQMusic", Genius:"enableGenius", Kugou:"enableKugou" };
    const DEFAULT_ORDER = ["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius","Kugou"];
    const order = src.sourceOrder?.length ? src.sourceOrder : DEFAULT_ORDER;
    const activeNames = order.filter(n => src[ENABLE_KEY[n]] !== false && SOURCE_MAP[n]);
    for (const n of activeNames) lyricsFetcher.addSource(SOURCE_MAP[n]());
    Debug_1.Debug.write(`[init] Active lyric sources (in order): ${activeNames.join(", ")}`);
    const playbackState = new PlaybackState_1.PlaybackState();
    const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
    const gatewayClient = new GatewayClient_1.GatewayClient();
    const statusChanger = new StatusChanger_1.StatusChanger(playbackState, Settings_1.Settings.restore?.savedStatus || null, gatewayClient);
    const _tokenValid = await _tokenValidPromise;
    if (!_tokenValid) statusChanger._tokenInvalid = true;
    gatewayClient.onReady = () => statusChanger._onGatewayReady();
    const _identityPref = p => p === "mobile" ? "mobile" : "other";
    let _lastIdentityPref = _identityPref(Settings_1.Settings.gateway?.presenceStatus);
    let _lastRawPref = Settings_1.Settings.gateway?.presenceStatus;
    setInterval(() => {
        if (!statusChanger._tokenInvalid) return;
        _validateDiscordToken().then(ok => { if (!ok) return; statusChanger._tokenInvalid = false; Debug_1.Debug.write("[init] Token re-validated OK — resuming sends"); if (Settings_1.Settings.gateway?.enabled && !gatewayClient.connected) gatewayClient.connect().catch(e => Debug_1.Debug.write(`[init] gateway reconnect after token recovery: ${e && e.stack || e}`)); });
    }, 10000);
    setInterval(() => {
        if (!Settings_1.Settings.gateway?.enabled) return;
        const raw = Settings_1.Settings.gateway?.presenceStatus;
        const p = _identityPref(raw);
        if (p !== _lastIdentityPref) { _lastIdentityPref = p; _lastRawPref = raw; Debug_1.Debug.write("[init] presenceStatus identity changed — forcing fresh gateway IDENTIFY"); gatewayClient.forceReconnect(); }
        else if (raw !== _lastRawPref) { _lastRawPref = raw; Debug_1.Debug.write("[init] presenceStatus changed — refreshing presence"); gatewayClient.refreshPresenceStatus(); }
    }, 2000);
    setInterval(() => { if (!Settings_1.Settings.gateway?.enabled) return; const stuck = !gatewayClient.connected && !gatewayClient._reconnecting && gatewayClient._ws === null && !_idleDisconnected; if (stuck) { if (!_gwStuckSince) _gwStuckSince = Date.now(); else if (Date.now() - _gwStuckSince > 15000) { Debug_1.Debug.write("[init] Watchdog: gateway stuck disconnected 15s -- forcing connect"); gatewayClient.connect(); _gwStuckSince = 0; } } else _gwStuckSince = 0; }, 5000);
    if (_tokenValid && Settings_1.Settings.gateway?.enabled) gatewayClient.connect();
    let _now = Date.now(), _songEndedFired = false, _lastKnownSongId = "", _wasPlaying = null, _lastProgress = 0, _lastActivityAt = Date.now(), _idleDisconnected = false;
    let _progressInterval = null, _pollInterval = null; let _wdActiveSince = 0; let _gwStuckSince = 0; let _wdFiredAt = 0;
    const useDealer = !useDiscordPresence && Settings_1.Settings.credentials.useDealer !== false && !!Settings_1.Settings.credentials.cookies;
    let dealerClient = null;
    let _dealerConnected = false;
    if (useDiscordPresence) {
        Debug_1.Debug.write("[init] Discord presence mode — Spotify polling disabled");
        gatewayClient.onSpotifyActivity = playbackStateUpdater.applyDiscordSpotifyActivity.bind(playbackStateUpdater);
        _wasPlaying = false;
        setInterval(() => { const t=playbackStateUpdater._lastDiscordActivityAt||0; if (t && Date.now()-t>10000 && gatewayClient.connected) { Debug_1.Debug.write("[init] Watchdog: no Discord activity update in 10s -- forcing reconnect"); playbackStateUpdater._lastDiscordActivityAt=Date.now(); gatewayClient.forceReconnect(); } }, 10000);
    } else if (useDealer) {
        Debug_1.Debug.write("[init] Dealer mode enabled — starting Spotify dealer WebSocket");
        dealerClient = new SpotifyDealerClient_1.SpotifyDealerClient();
        dealerClient.onPlayerState = (playerState) => { playbackStateUpdater.applyDealerState(playerState).catch(e => Debug_1.Debug.write(`[Dealer] applyDealerState error: ${e.stack || e}`)); };
        dealerClient.onFailed = () => { Debug_1.Debug.write('[Dealer] Permanently failed — REST polling at 5s until restart'); };
        dealerClient.onReady = () => {
            _dealerConnected = true;
            clearTimeout(dealerClient._fallbackTimer); dealerClient._fallbackTimer = null;
            if (playbackState.songName && playbackState.songAuthor && playbackState.songId) {
                lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor, playbackState.songId).catch(e => Debug_1.Debug.write('[Dealer] pre-warm fetchLyrics error: ' + e));
            }
            playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[Dealer] Initial REST sync error: ${e.stack || e}`));
        };
        dealerClient._fallbackTimer = setTimeout(() => { dealerClient._fallbackTimer = null; if (!_dealerConnected && !dealerClient.connected) { Debug_1.Debug.write("[init] Dealer not ready after 2s — firing immediate REST poll"); playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-fallback] ${e.stack || e}`)); } }, 2000);
        dealerClient.connect().catch(e => Debug_1.Debug.write(`[Dealer] connect() rejected: ${e && e.stack || e}`));
        playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-init] ${e.stack || e}`)).finally(() => { if (_wasPlaying === null) _wasPlaying = playbackState.isPlaying; });
        let _lastDealerSyncAt = 0;
        setInterval(() => { const syncInterval = _dealerConnected && dealerClient?.connected ? 30000 : 5000; const sinceLastPoll = Date.now() - (_lastDealerSyncAt || 0); if (sinceLastPoll < syncInterval) return; _lastDealerSyncAt = Date.now(); playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-sync] Error: ${e.stack || e}`)); }, 5000);
        Debug_1.Debug.write("[init] Dealer mode: adaptive REST sync (5s if dealer down, 30s if connected)");
    } else {
        Debug_1.Debug.write("[init] Dealer mode disabled — using 5s REST polling");
        playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][init] ${e.stack || e}`));
        _pollInterval = setInterval(() => playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater] Unhandled error: ${e.stack || e}`)), 5000);
    }
    if (Settings_1.Settings.restore?.enabled) {
        const token = Settings_1.Settings.credentials.token;
        if (token) {
            fetch("https://discord.com/api/v10/users/@me/settings", { headers: { "Authorization": token, "X-Super-Properties": ClientIdentity_1.ClientIdentity.superProperties(), "X-Discord-Locale": "en-US", "User-Agent": ClientIdentity_1.ClientIdentity.userAgent() } })
                .then(r => r.json())
                .then(j => {
                    if (j?.custom_status?.text) { statusChanger._savedStatus = j.custom_status; Debug_1.Debug.write(`[init] Captured current Discord status for restore: "${j.custom_status.text}"`); }
                    else if (!Settings_1.Settings.restore?.savedStatus) Debug_1.Debug.write(`[init] No current Discord status to save`);
                })
                .catch(e => Debug_1.Debug.write(`[init] Failed to fetch current Discord status: ${e}`))
                .finally(() => { statusChanger._captureReady = true; Debug_1.Debug.write(`[init] Capture gate opened`); });
            setTimeout(() => { if (!statusChanger._captureReady) { statusChanger._captureReady = true; Debug_1.Debug.write(`[init] Capture gate opened by 500ms grace window`); } }, 500);
        } else { statusChanger._captureReady = true; Debug_1.Debug.write(`[init] No token for capture — gate opened immediately`); }
    }
    _progressInterval = setInterval(() => {
        const now = Date.now();
        let _songChanged = false;
        if (playbackState.songId && playbackState.songId !== _lastKnownSongId) {
            _lastKnownSongId = playbackState.songId; _songEndedFired = false; _wasPlaying = playbackState.isPlaying;
            _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true; _rescheduleStatusCheck(0);
        }
        if (!_songChanged && playbackState.isPlaying && Math.abs(playbackState.songProgress - _lastProgress) > 5000) {
            Debug_1.Debug.write(`[init] Progress regression (${_lastProgress}->${playbackState.songProgress}) -- songChanged`);
            _songEndedFired = false; _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true; _rescheduleStatusCheck(0);
        }
        if (!_songChanged && playbackState.isPlaying && _wasPlaying === false) { statusChanger.songChanged(false); _rescheduleStatusCheck(0); }
        _wasPlaying = playbackState.isPlaying;
        if (Settings_1.Settings.gateway?.enabled) {
            if (playbackState.isPlaying && playbackState.hasLyrics) {
                _lastActivityAt = now;
                if (_idleDisconnected) { _idleDisconnected = false; Debug_1.Debug.write("[init] Playback resumed -- reconnecting gateway after idle disconnect"); setTimeout(()=>gatewayClient.connect(), 100 + Math.random()*300); }
            } else if (!_idleDisconnected && gatewayClient.connected && Settings_1.Settings.idle?.enabled !== false) {
                const _idleTimeoutMs = (Settings_1.Settings.idle?.timeoutSec || 300) * 1000;
                if (now - _lastActivityAt >= _idleTimeoutMs) {
                    _idleDisconnected = true;
                    Debug_1.Debug.write(`[init] No lyrics sent for ${_idleTimeoutMs}ms (playing=${playbackState.isPlaying}, hasLyrics=${playbackState.hasLyrics}) -- disconnecting gateway (idle)`);
                    gatewayClient.destroy();
                }
            }
        }
        if (playbackState.isPlaying) { playbackState.songProgress = useDiscordPresence && playbackState.songStartEpoch > 0 ? Math.max(0, now - playbackState.songStartEpoch) : playbackState.songProgress + (now - _now); }
        _lastProgress = playbackState.songProgress;
        _now = now;
        if (playbackState.ended) {
            if (!_songEndedFired) {
                _songEndedFired = true; statusChanger.songChanged(true);
                playbackState.lyrics = null; playbackState.hasLyrics = false; lyricsFetcher.lastAttemptedFor = ""; Debug_1.Debug.write("[init] Song ended — cleared lyrics for replay re-fetch");
                if (!useDealer) playbackStateUpdater.update().catch(e => Debug_1.Debug.write('[PlaybackStateUpdater][song-end] ' + e));
            }
        } else _songEndedFired = false;
        if (playbackState.isPlaying && playbackState.hasLyrics) { if (!_wdActiveSince) _wdActiveSince = now; const _wdIdle = statusChanger._lastSentAt > _wdActiveSince ? 0 : now - _wdActiveSince; if (_wdIdle > 10000) { Debug_1.Debug.write(`[init] Watchdog: idle ${_wdIdle}ms (lastSentAt=${statusChanger._lastSentAt}, scanIndex=${statusChanger._scanIndex}, sentLines=${statusChanger.sentLines?.size}) -- forcing reset`); statusChanger._lastSentAt = 0; if (!statusChanger._rollbackLines) statusChanger._rollbackLines = new Set(); if (statusChanger._lastAnchorLine) { statusChanger._rollbackLines.add(statusChanger._lastAnchorLine); Debug_1.Debug.write('[init] Watchdog: forcing anchor retry'); } if (statusChanger._scanIndex >= (statusChanger.playbackState.lyrics?.lines?.length||0)) statusChanger._scanIndex = 0; _rescheduleStatusCheck(0); _wdActiveSince = now; _wdFiredAt = now; } } else _wdActiveSince = 0;
    }, 100);
    let _statusCheckTimer = null;
    function _scheduleNextStatusCheck() {
        const ps = playbackState;
        if (!ps.isPlaying || ps.ended) { _statusCheckTimer = setTimeout(_statusTick, 500); return; }
        const adv = Settings_1.Settings.view.advanced;
        const needsFast = adv?.styleAlternateEnabled || adv?.styleWordMapMarquee || Settings_1.Settings.statusFlash?.enabled;
        if (needsFast) { _statusCheckTimer = setTimeout(_statusTick, 100); return; }
        if (!ps.hasLyrics || !ps.lyrics?.lines?.length) { _statusCheckTimer = setTimeout(_statusTick, 200); return; }
        const lines = ps.lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset ? statusChanger.autooffset.getAverageValue() + 100 : (Settings_1.Settings.timings.sendTimeOffset || 0);
        const progress = ps.songProgress;
        const _usingGwSched = Settings_1.Settings.gateway?.enabled && gatewayClient?.connected;
        const _mergeFloorSched = Settings_1.Settings.rateLimit.enableMergeLines ? (Settings_1.Settings.rateLimit.mergeWindowMs || 0) : 0;
        const minInterval = Math.max(_usingGwSched ? (Settings_1.Settings.gateway?.minGwIntervalMs ?? 5000) : (Settings_1.Settings.rateLimit.enableMinInterval ? (Settings_1.Settings.rateLimit.minIntervalMs || 5000) : 0), _mergeFloorSched);
        let nextLineMs = null;
        for (let i = 0; i < lines.length; i++) {
            const lineEta = lines[i].time - offset;
            if (lineEta > progress) {
                if (statusChanger.sentLines.has(lines[i]) && !statusChanger._staleLines.has(lines[i]) && !statusChanger._rollbackLines?.has(lines[i])) continue;
                nextLineMs = lineEta - progress; break;
            }
        }
        if (nextLineMs === null) { _statusCheckTimer = setTimeout(_statusTick, 500); return; }
        const sinceLastSent = Date.now() - statusChanger._lastSentAt;
        const minIntervalRemaining = minInterval > 0 ? Math.max(0, minInterval - sinceLastSent) : 0;
        const delay = minIntervalRemaining > 0 ? Math.max(50, Math.min(nextLineMs - 50, minIntervalRemaining, 10000)) : Math.max(50, Math.min(nextLineMs - 50, 10000));
        _statusCheckTimer = setTimeout(_statusTick, delay);
    }
    function _rescheduleStatusCheck(delay) {
        if (_statusCheckTimer) { clearTimeout(_statusCheckTimer); _statusCheckTimer = null; }
        _statusCheckTimer = setTimeout(_statusTick, delay ?? 0);
    }
    function _statusTick() { _statusCheckTimer = null; statusChanger.changeStatus(); _scheduleNextStatusCheck(); }
    _statusCheckTimer = setTimeout(_statusTick, 100);
    process.stdout.write("\x1b[2J\x1b[H\x1b[?25l");
    const { broadcast: _broadcastStatus } = (0, Server_1.startServer)() || {};
    let _cachedSourceOrderRef = null, _cachedSourcesLine = "";
    const W = 62;
    const C = {reset:"\x1b[0m\x1b[97m",bold:"\x1b[1m",dim:"\x1b[2m",green:"\x1b[32m",yellow:"\x1b[33m",red:"\x1b[31m",cyan:"\x1b[36m",white:"\x1b[97m",gray:"\x1b[90m"};
    const _strip = s => s.replace(/\x1b\[[0-9;]*m/g, "");
    const _pad = (s, w) => { const l = _strip(s).length; return s + " ".repeat(Math.max(0, w - l)); };
    const row = (content) => `\x1b[90m\u2502\x1b[97m ${_pad(content, W - 1)}\x1b[90m\u2502\x1b[97m`;
    const row2 = (left, right, rw) => { const lw = W - 2 - rw; return `\x1b[90m\u2502\x1b[97m ${_pad(left, lw)} ${_pad(right, rw)}\x1b[90m\u2502\x1b[97m`; };
    const sep    = `\x1b[90m\u251c${"\u2500".repeat(W)}\u2524\x1b[97m`;
    const sepTop = `\x1b[90m\u250c${"\u2500".repeat(W)}\u2510\x1b[97m`;
    const sepBot = `\x1b[90m\u2514${"\u2500".repeat(W)}\u2518\x1b[97m`;
    const _bar = (prog, dur, barW) => { if (!dur || !isFinite(dur) || dur <= 0) return C.gray + "\u2500".repeat(barW) + C.reset; const filled = Math.round(Math.min(1, prog / dur) * barW); return C.green + "\u2588".repeat(filled) + C.gray + "\u2591".repeat(barW - filled) + C.reset; };
    const _trunc = (s, maxLen) => s.length > maxLen ? s.slice(0, maxLen - 1) + "\u2026" : s;
    const _displayInterval = setInterval(() => {
        const progress   = playbackState.songProgress;
        const durationMs = playbackState.songDuration;
        const durationSec = isFinite(durationMs) ? +(durationMs / 1000).toFixed(0) : 0;
        const lyrics  = playbackState.lyrics;
        const lines   = lyrics?.lines;
        const offset  = Settings_1.Settings.timings.sendTimeOffset || 0;
        const nowMs   = Date.now();
        let dueLine = "", nextLine = "", nextEta = "";
        if (lines?.length) {
            const dueIndex = lines.reduce((acc, l, i) => l.time <= progress + offset ? i : acc, -1);
            if (dueIndex >= 0) {
                dueLine = lines[dueIndex].text || "";
                const nx = lines[dueIndex + 1];
                if (nx) { nextLine = nx.text || ""; nextEta = `${((nx.time - progress) / 1000).toFixed(1)}s`; }
            }
        }
        const { enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs, enableBackoff } = Settings_1.Settings.rateLimit;
        const minInterval        = enableMinInterval ? (minIntervalMs || 5000) : 0;
        const rateLimitRemaining = statusChanger._rateLimitedUntil > nowMs ? ((statusChanger._rateLimitedUntil - nowMs) / 1000).toFixed(1) : null;
        const nextSendIn         = statusChanger._lastSentAt > 0 ? Math.max(0, minInterval - (nowMs - statusChanger._lastSentAt)) : 0;
        const curOrder = Settings_1.Settings.sources?.sourceOrder;
        if (curOrder !== _cachedSourceOrderRef) {
            _cachedSourceOrderRef = curOrder;
            const ord = curOrder?.length ? curOrder : DEFAULT_ORDER;
            _cachedSourcesLine = ord.filter(n => Settings_1.Settings.sources[ENABLE_KEY[n]] !== false).map((n, i) => `${i + 1}. ${n}`).join("  ");
        }
        const op3Used = gatewayClient._presenceSentTimes.filter(t => nowMs - t <= 20000).length;
        const gwBadge = Settings_1.Settings.gateway?.enabled
            ? (gatewayClient.connected ? `${C.green}GW${C.reset}${C.gray} ${op3Used}/5${C.reset}` : (_idleDisconnected ? `${C.gray}GW idle${C.reset}` : (gatewayClient._reconnecting || gatewayClient._ws !== null ? `${C.yellow}GW~${C.reset}` : `${C.red}GW${C.reset}`)))
            : `${C.gray}GW off${C.reset}`;
        const spotifyBadge = useDiscordPresence ? `${C.cyan}DiscordPresence${C.reset}` : useDealer ? (dealerClient?.connected ? `${C.green}WS${C.reset}` : `${C.yellow}WS~${C.reset}`) : `${C.gray}REST/5s${C.reset}`;
        const sendBadge = rateLimitRemaining ? `${C.red}rate-limited ${rateLimitRemaining}s${C.reset}` : nextSendIn <= 0 ? `${C.green}ready${C.reset}` : `${C.yellow}cooldown ${(nextSendIn / 1000).toFixed(1)}s${C.reset}`;
        const lyricsBadge = playbackState.hasLyrics ? `${C.green}\u2713${C.reset} ${C.cyan}${lyricsFetcher.lastFetchedFrom || "?"}${C.reset}` : (playbackState.songId && !playbackState.hasLyrics && !lyrics ? `${C.yellow}\u29d6 fetching${C.reset}` : `${C.red}\u2717 none${C.reset}`);
        const playBadge = playbackState.isPlaying ? `${C.green}\u25b6 playing${C.reset}` : `${C.yellow}\u23f8 paused${C.reset}`;
        const savedRaw = statusChanger._savedStatus?.text || "";
        const restoreBadge = Settings_1.Settings.restore?.enabled ? (statusChanger._restoreTimer ? `${C.yellow}pending${C.reset}` : `${C.green}armed${C.reset}`) : `${C.gray}off${C.reset}`;
        const rlSettings = [`${C.gray}interval:${C.reset}${enableMinInterval ? C.green + (Math.max(minIntervalMs||0, enableMergeLines?(mergeWindowMs||0):0)/1000).toFixed(1) + "s" + C.reset : C.gray + "off" + C.reset}`, `${C.gray}merge:${C.reset}${enableMergeLines ? C.green + ((mergeWindowMs||0)/1000).toFixed(1) + "s" + C.reset : C.gray + "off" + C.reset}`, `${C.gray}backoff:${C.reset}${enableBackoff ? C.green + "on" + C.reset : C.gray + "off" + C.reset}`].join("  ");
        const timeStr  = `${statusChanger.formatSeconds(+(progress / 1000).toFixed(0))} / ${statusChanger.formatSeconds(durationSec)}`;
        const barWidth = W - _strip(timeStr).length - 10;
        const barStr   = _bar(progress, durationMs, Math.max(4, barWidth));
        const titleLeft  = `${C.bold}${C.white}lyrics-status${C.reset}`;
        const titleRight = `${C.gray}spotify: ${C.reset}${spotifyBadge}  ${C.gray}discord: ${C.reset}${gwBadge}`;
        const sentText = statusChanger._lastSentText ? `${C.dim}"${_trunc(statusChanger._lastSentText, W - 4)}"${C.reset}` : `${C.gray}nothing sent yet${C.reset}`;
        const songDisplay   = playbackState.songName   ? `${C.bold}${_trunc(playbackState.songName,   W - 21)}${C.reset}` : `${C.gray}not listening${C.reset}`;
        const artistDisplay = playbackState.songAuthor ? `${_trunc(playbackState.songAuthor, W - 14)}` : `${C.gray}\u2014${C.reset}`;
        const dueDisplay    = dueLine  ? `${C.bold}${_trunc(dueLine,  W - 4)}${C.reset}` : `${C.gray}\u2014${C.reset}`;
        const nextDisplay   = nextLine ? `${C.dim}${_trunc(nextLine, W - 4 - (nextEta ? nextEta.length + 4 : 0))}${nextEta ? "  " + C.gray + "(" + nextEta + ")" : ""}${C.reset}` : `${C.gray}\u2014${C.reset}`;
        const out = [
            sepTop,
            row2(titleLeft, titleRight, _strip(titleRight).length),
            sep,
            row(`${C.gray}song   ${C.reset}${songDisplay}    ${playBadge}`),
            row(`${C.gray}artist ${C.reset}${artistDisplay}`),
            row(`${C.gray}time   ${C.reset}${timeStr}  ${barStr}`),
            row(`${C.gray}src    ${C.reset}${lyricsBadge}`),
            row(`${C.gray}order  ${C.reset}${C.dim}${_trunc(_cachedSourcesLine, W - 9)}${C.reset}`),
            sep,
            row(`${C.green}\u25b6${C.reset}  ${dueDisplay}`),
            row(`${C.gray}\u203a${C.reset}  ${nextDisplay}`),
            sep,
            row(`${C.gray}sent   ${C.reset}${sentText}`),
            row(`${C.gray}send   ${C.reset}${sendBadge}   ${C.gray}restore: ${C.reset}${restoreBadge}${savedRaw ? "  " + C.dim + '"' + _trunc(savedRaw, 22) + '"' + C.reset : ""}`),
            row(`${C.gray}limits ${C.reset}${rlSettings}`),
            row(`${C.gray}debug  ${C.reset}scanIndex:${statusChanger._scanIndex||0} sentLines:${statusChanger.sentLines?.size||0} rollback:${statusChanger._rollbackLines?.size||0} watchdog:${_wdActiveSince?((Date.now()-_wdActiveSince)/1000).toFixed(0)+"s":"-"}`),
            row(`${C.gray}iosSync ${C.reset}${statusChanger._iOSSyncSentAt?((Date.now()-statusChanger._iOSSyncSentAt)/1000).toFixed(0)+"s ago":"never"}   ${C.gray}gwStuck ${C.reset}${_gwStuckSince?((Date.now()-_gwStuckSince)/1000).toFixed(0)+"s":"-"}   ${_wdFiredAt&&Date.now()-_wdFiredAt<5000?C.red+"WATCHDOG":C.gray+"watchdog"}${C.reset}`),
            sepBot,
        ].map(r => r + "\x1b[K").join("\n");
        process.stdout.write("\x1b[H\x1b[97m" + out + "\n\x1b[J");
        if (typeof _broadcastStatus === "function") {
            _broadcastStatus({
                type: "status",
                song: playbackState.songName || "",
                author: playbackState.songAuthor || "",
                lyric: dueLine || "",
                source: lyricsFetcher.lastFetchedFrom || "",
                progress: statusChanger.formatSeconds(+(progress / 1000).toFixed(0)) + " / " + statusChanger.formatSeconds(durationSec),
                isPlaying: playbackState.isPlaying,
                gwEnabled: !!(Settings_1.Settings.gateway?.enabled),
                gwConnected: gatewayClient.connected,
                gwReconnecting: gatewayClient._reconnecting || (!gatewayClient.connected && gatewayClient._ws !== null),
                gwRate: op3Used,
                rateLimited: rateLimitRemaining,
                nextSend: nextSendIn,
                dealer: useDiscordPresence ? "discord" : useDealer ? (dealerClient?.connected ? "connected" : "reconnecting") : "rest",
                restore: Settings_1.Settings.restore?.enabled ? (statusChanger._restoreTimer ? "pending" : "armed") : "off",
                albumArt: playbackState.albumArtUrl || "",
            });
        }
    }, 1000);
    const _cleanExit = () => { clearInterval(_displayInterval); clearInterval(_progressInterval); clearInterval(_pollInterval); process.stdout.write("\x1b[?25h\x1b[0m\n"); try { clearTimeout(statusChanger._lastLineClearTimer); } catch(_){} try { dealerClient?.destroy(); } catch(_){} try { clearTimeout(dealerClient?._fallbackTimer); } catch(_){} try { gatewayClient?.destroy(); } catch(_){} try { _trayInst?.kill(false); } catch(_){} try { _store?.close(); } catch(_){} process.exit(0); };
    process.on("SIGINT", _cleanExit);
    process.on("SIGTERM", _cleanExit);
    const Tray_1 = require('./Tray'); const _trayInst = Tray_1.startTray(_cleanExit);
}
process.on("uncaughtException", e => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    const _isNetErr = e.message.includes("fetch failed") && (!e.cause || ["ECONNREFUSED","ENOTFOUND","ETIMEDOUT","ECONNRESET"].includes(e.cause?.code));
    if (!_isNetErr) { console.error("\x1b[31m[lyrics-status] Fatal error: " + e.message + "\x1b[0m"); console.error("Check log.txt for full details."); try { _store?.close(); } catch (_) {} process.exit(1); }
    else { console.error("\x1b[33m[lyrics-status] Network error (fetch failed) — check connection.\x1b[0m"); }
});
process.on("unhandledRejection", reason => {
    const msg = reason instanceof Error ? reason.stack : String(reason);
    Debug_1.Debug.write("[unhandledRejection] " + msg);
    const _isNetRej = reason instanceof Error && reason.message.includes("fetch failed") && (!reason.cause || ["ECONNREFUSED","ENOTFOUND","ETIMEDOUT","ECONNRESET"].includes(reason.cause && reason.cause.code));
    if (!_isNetRej) { console.error("\x1b[33m[lyrics-status] Unhandled rejection: " + (reason instanceof Error ? reason.message : String(reason)) + "\x1b[0m"); }
});

