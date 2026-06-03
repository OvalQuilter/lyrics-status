﻿"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// --- Startup checks ---
const _nodeVer = process.versions.node.split(".").map(Number);
if (_nodeVer[0] < 17) {
    console.error("\x1b[31m[lyrics-status] Node.js v" + process.versions.node + " is not supported. Please upgrade to v17 or later.\x1b[0m");
    process.exit(1);
}
try {
    require("better-sqlite3");
} catch (e) {
    if (e.code === "ERR_DLOPEN_FAILED" || (e.message && e.message.includes("NODE_MODULE_VERSION"))) {
        console.error("\x1b[33m[lyrics-status] Native module mismatch - rebuilding better-sqlite3 for Node.js v" + process.versions.node + "...\x1b[0m");
        const { execSync } = require("child_process");
        try {
            execSync("npm rebuild better-sqlite3", { stdio: "inherit", cwd: require("path").resolve(__dirname, "..") });
            console.log("\x1b[32m[lyrics-status] Rebuild successful - starting...\x1b[0m");
        } catch (rebuildErr) {
            console.error("\x1b[31m[lyrics-status] Rebuild failed. Try running 'npm rebuild' manually.\x1b[0m");
            process.exit(1);
        }
    } else {
        console.error("\x1b[31m[lyrics-status] Failed to load better-sqlite3: " + e.message + "\x1b[0m");
        process.exit(1);
    }
}
// --- End startup checks ---

const LyricsFetcher_1 = require("./LyricsFetcher");
const CacheStore_1 = require("./CacheStore");
const SpotifySource_1 = require("./Sources/SpotifySource");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const LrcLibSource_1 = require("./Sources/LrcLibSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
const MusixmatchSource_1 = require("./Sources/MusixmatchSource");
const GeniusSource_1 = require("./Sources/GeniusSource");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const GatewayClient_1 = require("./GatewayClient");
const SpotifyDealerClient_1 = require("./SpotifyDealerClient");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const Updater_1 = require("./Updater");
const SpotifyService_1 = require("./SpotifyService");
const uuid_1 = require("uuid");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
const path = require("path");

let _store = null;

Settings_1.Settings.load();

// Cleanup leftover temp/ from failed autoupdate
{ const { existsSync, rmSync } = require("fs"); const _tmp = require("path").join(__dirname, "../temp"); try { if (existsSync(_tmp)) { rmSync(_tmp, { recursive: true, force: true }); Debug_1.Debug.write("[init] Cleaned up leftover temp/ dir"); } } catch (e) { Debug_1.Debug.write("[init] Failed to clean temp/: " + e.message); } }

if (Settings_1.Settings.update.enableAutoupdate) {
    Updater_1.Updater.tryUpdate().catch(e => { Debug_1.Debug.write("LyricsStatus failed to update. Error: " + e.stack); }).finally(() => init());
} else { init(); }

async function init() {
    if (!Settings_1.Settings.credentials.uuid) { Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)(); Settings_1.Settings.save(); }
    ExternalAuthServerAPI_1.ExternalAuthServerAPI.register();
    // Await initial token refresh so first poll has a valid token
    if (Settings_1.Settings.credentials.refreshToken && !Settings_1.Settings.credentials.useExternalAuthServer) {
        await SpotifyService_1.SpotifyService.refresh().catch(e => Debug_1.Debug.write("[init] Initial token refresh failed: " + e));
        Debug_1.Debug.write('[init] Spotify token refreshed at startup');
        // Proactively refresh ~5min before OAuth token expiry
        const _expiry = Settings_1.Settings.credentials.spotifyWebTokenExpiry || 0;
        // CONN-06: only arm if expiry is known — prevents 60s spam on no-refreshToken setups
        if (_expiry > 0) {
            const _refreshIn = Math.max(60000, _expiry - Date.now() - 300000);
            setTimeout(function _proactiveRefresh() {
                SpotifyService_1.SpotifyService.refresh().catch(() => {});
                const exp = Settings_1.Settings.credentials.spotifyWebTokenExpiry || 0;
                if (exp > 0) setTimeout(_proactiveRefresh, Math.max(60000, exp - Date.now() - 300000));
            }, _refreshIn);
        }
    } else if (Settings_1.Settings.credentials.useExternalAuthServer) {
        SpotifyService_1.SpotifyService.token = (await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken().catch(() => null)) || '';
    }

    const dbPath = Settings_1.Settings.cache.path || path.resolve(__dirname, "../cache/cache.db");
    _store = new CacheStore_1.CacheStore(dbPath);

    const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher(_store);
    const src = Settings_1.Settings.sources;
    const SOURCE_MAP = {
        Spotify:    () => new SpotifySource_1.SpotifySource(),
        Musixmatch: () => new MusixmatchSource_1.MusixmatchSource(),
        LrcLib:     () => new LrcLibSource_1.LrcLibSource(),
        NetEase:    () => new NetEaseMusicSource_1.NetEaseMusicSource(),
        QQMusic:    () => new QQMusicSource_1.QQMusicSource(),
        Genius:     () => new GeniusSource_1.GeniusSource(),
    };
    const ENABLE_KEY = { Spotify:"enableSpotify", Musixmatch:"enableMusixmatch", LrcLib:"enableLrcLib", NetEase:"enableNetEase", QQMusic:"enableQQMusic", Genius:"enableGenius" };
    const DEFAULT_ORDER = ["Spotify","Musixmatch","LrcLib","NetEase","QQMusic","Genius"];
    const order = src.sourceOrder?.length ? src.sourceOrder : DEFAULT_ORDER;
    const activeNames = order.filter(n => src[ENABLE_KEY[n]] !== false && SOURCE_MAP[n]);
    for (const n of activeNames) lyricsFetcher.addSource(SOURCE_MAP[n]());
    Debug_1.Debug.write(`[init] Active lyric sources (in order): ${activeNames.join(", ")}`);

    const playbackState = new PlaybackState_1.PlaybackState();
    const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
    const gatewayClient = new GatewayClient_1.GatewayClient();
    const statusChanger = new StatusChanger_1.StatusChanger(playbackState, Settings_1.Settings.restore?.savedStatus || null, gatewayClient);
    gatewayClient.onReady = () => statusChanger._onGatewayReady();
    gatewayClient.connect();

    // --- Dealer WS or REST polling setup ---
    const useDealer = Settings_1.Settings.credentials.useDealer !== false && !!Settings_1.Settings.credentials.cookies;
    let dealerClient = null;
    let _dealerConnected = false;

    if (useDealer) {
        Debug_1.Debug.write("[init] Dealer mode enabled — starting Spotify dealer WebSocket");
        dealerClient = new SpotifyDealerClient_1.SpotifyDealerClient();

        // On each push from dealer, apply state immediately
        dealerClient.onPlayerState = (playerState) => {
            playbackStateUpdater.applyDealerState(playerState).catch(e =>
                Debug_1.Debug.write(`[Dealer] applyDealerState error: ${e.stack || e}`)
            );
        };

        // CONN-01: single onReady before connect() — no reassignment race
        dealerClient.onFailed = () => { Debug_1.Debug.write('[Dealer] Permanently failed — REST polling at 5s until restart'); };
        dealerClient.onReady = () => {
            _dealerConnected = true;
            clearTimeout(dealerClient._fallbackTimer); dealerClient._fallbackTimer = null;
            if (playbackState.songName && playbackState.songAuthor && playbackState.songId) {
                lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor, playbackState.songId)
                    .catch(e => Debug_1.Debug.write('[Dealer] pre-warm fetchLyrics error: ' + e)); // pre-warm: cache/in-flight before update() REST round-trip
            }
            playbackStateUpdater.update().catch(e =>
                Debug_1.Debug.write(`[Dealer] Initial REST sync error: ${e.stack || e}`)
            );
        };
        dealerClient._fallbackTimer = setTimeout(() => {
            dealerClient._fallbackTimer = null;
            if (!_dealerConnected) {
                Debug_1.Debug.write("[init] Dealer not ready after 2s — firing immediate REST poll");
                playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-fallback] ${e.stack || e}`));
            }
        }, 2000);
        dealerClient.connect();

        // Fire one immediate REST poll so initial state loads without waiting 30s
        playbackStateUpdater.update().catch(e => Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-init] ${e.stack || e}`)).finally(() => { if (_wasPlaying === null) _wasPlaying = playbackState.isPlaying; }); // CONN-25
        // Adaptive REST sync: 5s when dealer is down, 30s when connected
        setInterval(() => {
            const syncInterval = _dealerConnected && dealerClient?.connected ? 30000 : 5000;
            const sinceLastPoll = Date.now() - (_lastDealerSyncAt || 0);
            if (sinceLastPoll < syncInterval) return;
            _lastDealerSyncAt = Date.now();
            playbackStateUpdater.update().catch(e =>
                Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-sync] Error: ${e.stack || e}`)
            );
        }, 5000);
        let _lastDealerSyncAt = 0;
        Debug_1.Debug.write("[init] Dealer mode: adaptive REST sync (5s if dealer down, 30s if connected)");
    } else {
        // Original 5s REST polling
        Debug_1.Debug.write("[init] Dealer mode disabled — using 5s REST polling");
        _pollInterval = setInterval(() => playbackStateUpdater.update().catch(e => // CONN-40
            Debug_1.Debug.write(`[PlaybackStateUpdater] Unhandled error: ${e.stack || e}`)
        ), 5000);
    }

    if (Settings_1.Settings.restore?.enabled) {
        const token = Settings_1.Settings.credentials.token;
        if (token) {
            fetch("https://discordapp.com/api/v8/users/@me/settings", { headers: { "Authorization": token } })
                .then(r => r.json())
                .then(j => {
                    if (j?.custom_status?.text) { statusChanger._savedStatus = j.custom_status; Debug_1.Debug.write(`[init] Captured current Discord status for restore: "${j.custom_status.text}"`); }
                    else if (!Settings_1.Settings.restore?.savedStatus) Debug_1.Debug.write(`[init] No current Discord status to save`);
                })
                .catch(e => Debug_1.Debug.write(`[init] Failed to fetch current Discord status: ${e}`))
                .finally(() => { statusChanger._captureReady = true; Debug_1.Debug.write(`[init] Capture gate opened`); });
        } else { statusChanger._captureReady = true; Debug_1.Debug.write(`[init] No token for capture — gate opened immediately`); }
    }

    let _now = Date.now(), _songEndedFired = false, _lastKnownSongId = "", _wasPlaying = null, _lastProgress = 0; // CONN-25

    let _progressInterval = null, _pollInterval = null; // CONN-40
    // Progress tick: runs every 100ms — advances songProgress, detects song changes/end.
    // changeStatus() is NOT called here; it runs on its own smart schedule below.
    _progressInterval = setInterval(() => { // CONN-40
        const now = Date.now();
        let _songChanged = false;
        if (playbackState.songId && playbackState.songId !== _lastKnownSongId) {
            _lastKnownSongId = playbackState.songId; _songEndedFired = false; _wasPlaying = playbackState.isPlaying;
            _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true;
            _rescheduleStatusCheck(0); // new song — check immediately
        }
        if (!_songChanged && playbackState.isPlaying && playbackState.songProgress < _lastProgress - 5000) { // CONN-13
            Debug_1.Debug.write(`[init] Progress regression (${_lastProgress}->${playbackState.songProgress}) -- songChanged`);
            _songEndedFired = false; _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true;
            _rescheduleStatusCheck(0);
        }
        if (!_songChanged && playbackState.isPlaying && _wasPlaying === false) { statusChanger.songChanged(false); _rescheduleStatusCheck(0); } // CONN-25
        _wasPlaying = playbackState.isPlaying;
        if (playbackState.isPlaying) { playbackState.songProgress += now - _now; }
        _lastProgress = playbackState.songProgress;
        _now = now;
        if (playbackState.ended) {
            if (!_songEndedFired) {
                _songEndedFired = true;
                statusChanger.songChanged(true);
                playbackState.lyrics = null; playbackState.hasLyrics = false; lyricsFetcher.lastAttemptedFor = "";
                Debug_1.Debug.write("[init] Song ended — cleared lyrics for replay re-fetch");
                if (!useDealer) playbackStateUpdater.update().catch(e => Debug_1.Debug.write('[PlaybackStateUpdater][song-end] ' + e)); // #16: immediate poll on song end in REST mode
            }
        } else _songEndedFired = false;
    }, 100);

    // Smart status scheduler: fires changeStatus() timed to the next lyric line's ETA.
    // Falls back to 100ms polling only when: no lyrics, style-alternate active, or flash active.
    let _statusCheckTimer = null;
    function _scheduleNextStatusCheck() {
        const ps = playbackState;
        if (!ps.isPlaying || ps.ended) { _statusCheckTimer = setTimeout(_statusTick, 500); return; }

        // Style-alternate or flash need fast ticks
        const adv = Settings_1.Settings.view.advanced;
        const needsFast = (adv?.styleAlternateEnabled) || (Settings_1.Settings.statusFlash?.enabled);
        if (needsFast) { _statusCheckTimer = setTimeout(_statusTick, 100); return; }

        if (!ps.hasLyrics || !ps.lyrics?.lines?.length) {
            _statusCheckTimer = setTimeout(_statusTick, 200); return;
        }

        const lines = ps.lyrics.lines;
        const offset = Settings_1.Settings.timings.enableAutooffset
            ? statusChanger.autooffset.getAverageValue() + 100
            : (Settings_1.Settings.timings.sendTimeOffset || 0);
        const progress = ps.songProgress;
        const minInterval = Settings_1.Settings.rateLimit.enableMinInterval
            ? (Settings_1.Settings.rateLimit.minIntervalMs || 5000) : 0;

        // Find the next line that hasn't been sent yet and is in the future
        let nextLineMs = null;
        for (let i = 0; i < lines.length; i++) {
            const lineEta = lines[i].time - offset;
            if (lineEta > progress) {
                nextLineMs = lineEta - progress;
                break;
            }
        }

        if (nextLineMs === null) {
            // Past all lines — check occasionally for song end
            _statusCheckTimer = setTimeout(_statusTick, 500); return;
        }

        // Schedule slightly early (~50ms) so we don't miss the window;
        // also respect minInterval — no point waking up before we can send
        const sinceLastSent = Date.now() - statusChanger._lastSentAt;
        const minIntervalRemaining = minInterval > 0 ? Math.max(0, minInterval - sinceLastSent) : 0;
        const delay = minIntervalRemaining > 0 ? Math.max(50, Math.min(nextLineMs - 50, minIntervalRemaining, 10000)) : Math.max(50, Math.min(nextLineMs - 50, 10000)); // CONN-14
        _statusCheckTimer = setTimeout(_statusTick, delay);
    }
    function _rescheduleStatusCheck(delay) {
        if (_statusCheckTimer) { clearTimeout(_statusCheckTimer); _statusCheckTimer = null; }
        _statusCheckTimer = setTimeout(_statusTick, delay ?? 0);
    }
    function _statusTick() {
        _statusCheckTimer = null;
        statusChanger.changeStatus();
        _scheduleNextStatusCheck();
    }
    _statusCheckTimer = setTimeout(_statusTick, 100); // initial kick

    process.stdout.write("\x1b[2J\x1b[H\x1b[?25l"); // clear + hide cursor

    const { broadcast: _broadcastStatus } = (0, Server_1.startServer)() || {};
    let _cachedSourceOrderRef = null, _cachedSourcesLine = "";

    // ─── display helpers ──────────────────────────────────────────────────────
    const W = 62; // total inner width (between border chars)
    const C = {
        reset:  "\x1b[0m\x1b[97m", // reset always returns to bright white
        bold:   "\x1b[1m",
        dim:    "\x1b[2m",
        green:  "\x1b[32m",
        yellow: "\x1b[33m",
        red:    "\x1b[31m",
        cyan:   "\x1b[36m",
        white:  "\x1b[97m",
        gray:   "\x1b[90m",
    };
    // strip ANSI for length measurement
    const _strip = s => s.replace(/\x1b\[[0-9;]*m/g, "");
    const _pad = (s, w) => { const l = _strip(s).length; return s + " ".repeat(Math.max(0, w - l)); };
    // row with left border, content padded to W, right border
    const row = (content) => `\x1b[90m\u2502\x1b[97m ${_pad(content, W - 1)}\x1b[90m\u2502\x1b[97m`;
    // two-column row: left fills available, right is fixed width rw
    const row2 = (left, right, rw) => {
        const lw = W - 2 - rw;
        return `\x1b[90m\u2502\x1b[97m ${_pad(left, lw)} ${_pad(right, rw)}\x1b[90m\u2502\x1b[97m`;
    };
    const sep     = `\x1b[90m\u251c${ "\u2500".repeat(W + 1)}\u2524\x1b[97m`;
    const sepTop  = `\x1b[90m\u250c${ "\u2500".repeat(W + 1)}\u2510\x1b[97m`;
    const sepBot  = `\x1b[90m\u2514${ "\u2500".repeat(W + 1)}\u2518\x1b[97m`;
    // progress bar
    const _bar = (prog, dur, barW) => {
        if (!dur || !isFinite(dur) || dur <= 0) return C.gray + "\u2500".repeat(barW) + C.reset;
        const pct = Math.min(1, prog / dur);
        const filled = Math.round(pct * barW);
        return C.green + "\u2588".repeat(filled) + C.gray + "\u2591".repeat(barW - filled) + C.reset;
    };
    // truncate plain string
    const _trunc = (s, maxLen) => s.length > maxLen ? s.slice(0, maxLen - 1) + "\u2026" : s;

    const _displayInterval = setInterval(() => {
        const progress    = playbackState.songProgress;
        const durationMs  = playbackState.songDuration;
        const durationSec = isFinite(durationMs) ? +(durationMs / 1000).toFixed(0) : 0;
        const lyrics      = playbackState.lyrics;
        const lines       = lyrics?.lines;
        const offset      = Settings_1.Settings.timings.sendTimeOffset || 0;
        const nowMs       = Date.now();

        // ── lyric lines ──
        let dueLine = "", nextLine = "", nextEta = "";
        if (lines?.length) {
            const dueIndex = lines.reduce((acc, l, i) => l.time <= progress + offset ? i : acc, -1);
            if (dueIndex >= 0) {
                dueLine  = lines[dueIndex].text || "";
                const nx = lines[dueIndex + 1];
                if (nx) { nextLine = nx.text || ""; nextEta = `${((nx.time - progress) / 1000).toFixed(1)}s`; }
            }
        }

        // ── rate / send ──
        const { enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs, enableBackoff } = Settings_1.Settings.rateLimit;
        const minInterval        = enableMinInterval ? (minIntervalMs || 5000) : 0;
        const rateLimitRemaining = statusChanger._rateLimitedUntil > nowMs ? ((statusChanger._rateLimitedUntil - nowMs) / 1000).toFixed(1) : null;
        const nextSendIn         = statusChanger._lastSentAt > 0 ? Math.max(0, minInterval - (nowMs - statusChanger._lastSentAt)) : 0;

        // ── source order ──
        const curOrder = Settings_1.Settings.sources?.sourceOrder;
        if (curOrder !== _cachedSourceOrderRef) {
            _cachedSourceOrderRef = curOrder;
            const ord = curOrder?.length ? curOrder : DEFAULT_ORDER;
            _cachedSourcesLine = ord.filter(n => Settings_1.Settings.sources[ENABLE_KEY[n]] !== false).map((n, i) => `${i + 1}. ${n}`).join("  ");
        }

        // ── gateway ──
        const op3Used = gatewayClient._presenceSentTimes.filter(t => nowMs - t <= 20000).length;
        const gwBadge = Settings_1.Settings.gateway?.enabled
            ? (gatewayClient.connected
                ? `${C.green}GW${C.reset}${C.gray} ${op3Used}/5${C.reset}`
                : gatewayClient._reconnecting || gatewayClient._ws !== null
                    ? `${C.yellow}GW~${C.reset}`
                    : `${C.red}GW${C.reset}`)
            : `${C.gray}GW off${C.reset}`;

        // ── spotify / dealer ──
        const spotifyBadge = useDealer
            ? (dealerClient?.connected
                ? `${C.green}WS${C.reset}`
                : `${C.yellow}WS~${C.reset}`)
            : `${C.gray}REST/5s${C.reset}`;

        // ── send status ──
        const sendBadge = rateLimitRemaining
            ? `${C.red}rate-limited ${rateLimitRemaining}s${C.reset}`
            : nextSendIn <= 0
                ? `${C.green}ready${C.reset}`
                : `${C.yellow}cooldown ${(nextSendIn / 1000).toFixed(1)}s${C.reset}`;

        // ── lyrics source ──
        const lyricsBadge = playbackState.hasLyrics
            ? `${C.green}\u2713${C.reset} ${C.cyan}${lyricsFetcher.lastFetchedFrom || "?"}${C.reset}`
            : playbackState.songId && !playbackState.hasLyrics && !lyrics
                ? `${C.yellow}\u29d6 fetching${C.reset}`
                : `${C.red}\u2717 none${C.reset}`;

        // ── playback ──
        const playBadge = playbackState.isPlaying
            ? `${C.green}\u25b6 playing${C.reset}`
            : `${C.yellow}\u23f8 paused${C.reset}`;

        // ── restore ──
        const savedRaw   = statusChanger._savedStatus?.text || "";
        const restoreBadge = Settings_1.Settings.restore?.enabled
            ? (statusChanger._restoreTimer ? `${C.yellow}pending${C.reset}` : `${C.green}armed${C.reset}`)
            : `${C.gray}off${C.reset}`;

        // ── rate limit settings ──
        const rlSettings = [
            `${C.gray}interval:${C.reset}${enableMinInterval ? C.green + ((minIntervalMs||0)/1000).toFixed(1) + "s" + C.reset : C.gray + "off" + C.reset}`,
            `${C.gray}merge:${C.reset}${enableMergeLines ? C.green + ((mergeWindowMs||0)/1000).toFixed(1) + "s" + C.reset : C.gray + "off" + C.reset}`,
            `${C.gray}backoff:${C.reset}${enableBackoff ? C.green + "on" + C.reset : C.gray + "off" + C.reset}`,
        ].join("  ");

        // ── time + bar ──
        const timeStr  = `${statusChanger.formatSeconds(+(progress / 1000).toFixed(0))} / ${statusChanger.formatSeconds(durationSec)}`;
        const barWidth = W - _strip(timeStr).length - 3;
        const barStr   = _bar(progress, durationMs, Math.max(4, barWidth));

        // ── title row ──
        const titleLeft  = `${C.bold}${C.white}lyrics-status${C.reset}`;
        const titleRight = `${C.gray}spotify: ${C.reset}${spotifyBadge}  ${C.gray}discord: ${C.reset}${gwBadge}`;

        // ── sent text ──
        const sentText = statusChanger._lastSentText
            ? `${C.dim}"${_trunc(statusChanger._lastSentText, W - 4)}"${C.reset}`
            : `${C.gray}nothing sent yet${C.reset}`;

        const songDisplay   = playbackState.songName   ? `${C.bold}${_trunc(playbackState.songName,   W - 14)}${C.reset}` : `${C.gray}not listening${C.reset}`;
        const artistDisplay = playbackState.songAuthor ? `${_trunc(playbackState.songAuthor, W - 14)}` : `${C.gray}\u2014${C.reset}`;
        const dueDisplay    = dueLine  ? `${C.bold}${_trunc(dueLine,  W - 4)}${C.reset}` : `${C.gray}\u2014${C.reset}`;
        const nextDisplay   = nextLine
            ? `${C.dim}${_trunc(nextLine, W - 4 - (nextEta ? nextEta.length + 4 : 0))}${nextEta ? "  " + C.gray + "(" + nextEta + ")" : ""}${C.reset}`
            : `${C.gray}\u2014${C.reset}`;

        const out = [
            sepTop,
            row2(titleLeft, titleRight, _strip(titleRight).length),
            sep,
            row(`${C.gray}song   ${C.reset}${songDisplay}    ${playBadge}`),
            row(`${C.gray}artist ${C.reset}${artistDisplay}`),
            row(`${C.gray}time   ${C.reset}${timeStr}  ${barStr}`),
            row(`${C.gray}src    ${C.reset}${lyricsBadge}   ${C.gray}order: ${C.reset}${C.dim}${_trunc(_cachedSourcesLine, W - 24)}${C.reset}`),
            sep,
            row(`${C.green}\u25b6${C.reset}  ${dueDisplay}`),
            row(`${C.gray}\u203a${C.reset}  ${nextDisplay}`),
            sep,
            row(`${C.gray}sent   ${C.reset}${sentText}`),
            row(`${C.gray}send   ${C.reset}${sendBadge}   ${C.gray}restore: ${C.reset}${restoreBadge}${savedRaw ? "  " + C.dim + '"' + _trunc(savedRaw, 22) + '"' + C.reset : ""}`),
            row(`${C.gray}limits ${C.reset}${rlSettings}`),
            sepBot,
        ].map(r => r + "\x1b[K").join("\n");

        process.stdout.write("\x1b[H\x1b[97m" + out + "\n\x1b[J");

        // Broadcast live status to web panel clients
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
                dealer: useDealer ? (dealerClient?.connected ? "connected" : "reconnecting") : "rest",
                restore: Settings_1.Settings.restore?.enabled
                    ? (statusChanger._restoreTimer ? "pending" : "armed")
                    : "off",
                albumArt: playbackState.albumArtUrl || "",
            });
        }
    }, 1000);
    const _cleanExit = () => { clearInterval(_displayInterval); clearInterval(_progressInterval); clearInterval(_pollInterval); // CONN-40
        process.stdout.write("\x1b[?25h\x1b[0m\n"); try { dealerClient?.destroy(); } catch(_){} try { gatewayClient?.destroy(); } catch(_){} try { _store?.close(); } catch(_){} process.exit(0); };
    process.on("SIGINT", _cleanExit);
    process.on("SIGTERM", _cleanExit);
    const Tray_1 = require('./Tray'); Tray_1.startTray(_cleanExit);
}

process.on("uncaughtException", e => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    const _isNetErr = e.message.includes("fetch failed") && (!e.cause || ["ECONNREFUSED","ENOTFOUND","ETIMEDOUT","ECONNRESET"].includes(e.cause?.code)); // CONN-23
    if (!_isNetErr) {
        console.error("\x1b[31m[lyrics-status] Fatal error: " + e.message + "\x1b[0m");
        console.error("Check log.txt for full details.");
        try { _store?.close(); } catch (_) {}
        process.exit(1);
    } else {
        console.error("\x1b[33m[lyrics-status] Network error (fetch failed) — check connection.\x1b[0m");
    }
});
process.on("unhandledRejection", reason => {
    const msg = reason instanceof Error ? reason.stack : String(reason);
    Debug_1.Debug.write("[unhandledRejection] " + msg);
    const _isNetRej = reason instanceof Error && reason.message.includes("fetch failed") && (!reason.cause || ["ECONNREFUSED","ENOTFOUND","ETIMEDOUT","ECONNRESET"].includes(reason.cause && reason.cause.code)); // CONN-24
    if (!_isNetRej) {
        console.error("\x1b[33m[lyrics-status] Unhandled rejection: " + (reason instanceof Error ? reason.message : String(reason)) + "\x1b[0m");
    }
});
