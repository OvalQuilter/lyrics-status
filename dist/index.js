"use strict";
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

function init() {
    if (!Settings_1.Settings.credentials.uuid) { Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)(); Settings_1.Settings.save(); }
    ExternalAuthServerAPI_1.ExternalAuthServerAPI.register();
    SpotifyService_1.SpotifyService.refresh();

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

        dealerClient.onReady = () => {
            _dealerConnected = true;
            // Fetch initial state via REST once on connect so we don't wait for next push
            playbackStateUpdater.update().catch(e =>
                Debug_1.Debug.write(`[Dealer] Initial REST sync error: ${e.stack || e}`)
            );
        };

        dealerClient.connect();

        // Periodic REST sync in dealer mode: every 30s to keep progress accurate
        // and as a safety net if dealer misses a pause/resume event
        setInterval(() => {
            playbackStateUpdater.update().catch(e =>
                Debug_1.Debug.write(`[PlaybackStateUpdater][dealer-sync] Error: ${e.stack || e}`)
            );
        }, 30000);

        Debug_1.Debug.write("[init] Dealer mode: REST polling suppressed (30s sync only)");
    } else {
        // Original 5s REST polling
        Debug_1.Debug.write("[init] Dealer mode disabled — using 5s REST polling");
        setInterval(() => playbackStateUpdater.update().catch(e =>
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

    let _now = Date.now(), _songEndedFired = false, _lastKnownSongId = "", _wasPlaying = false, _lastProgress = 0;
    setInterval(() => {
        const now = Date.now();
        let _songChanged = false;
        if (playbackState.songId && playbackState.songId !== _lastKnownSongId) {
            _lastKnownSongId = playbackState.songId; _songEndedFired = false; _wasPlaying = playbackState.isPlaying;
            _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true;
        }
        if (!_songChanged && playbackState.isPlaying && playbackState.songProgress < _lastProgress - 3000) {
            Debug_1.Debug.write(`[init] Progress regression (${_lastProgress}->${playbackState.songProgress}) -- songChanged`);
            _songEndedFired = false; _lastProgress = playbackState.songProgress;
            statusChanger.songChanged(false); _songChanged = true;
        }
        if (!_songChanged && playbackState.isPlaying && !_wasPlaying) statusChanger.songChanged(false);
        _wasPlaying = playbackState.isPlaying;
        if (playbackState.isPlaying) { playbackState.songProgress += now - _now; _lastProgress = playbackState.songProgress; }
        _now = now;
        statusChanger.changeStatus();
        if (playbackState.ended) {
            if (!_songEndedFired) {
                _songEndedFired = true;
                statusChanger.songChanged(true);
                playbackState.lyrics = null; playbackState.hasLyrics = false; lyricsFetcher.lastAttemptedFor = "";
                Debug_1.Debug.write("[init] Song ended — cleared lyrics for replay re-fetch");
            }
        } else _songEndedFired = false;
    }, 100);

    process.stdout.write("\x1b[2J\x1b[H");

    let _cachedSourceOrderRef = null, _cachedSourcesLine = "";
    setInterval(() => {
        const lyrics = playbackState.lyrics, progress = playbackState.songProgress;
        const offset = Settings_1.Settings.timings.sendTimeOffset || 0;
        const lines = lyrics?.lines;
        let dueLine = "Not available", nextLine = "Not available";
        if (lines?.length) {
            const dueIndex = lines.reduce((acc, l, i) => l.time <= progress + offset ? i : acc, -1);
            if (dueIndex >= 0) {
                dueLine = lines[dueIndex].text || "Not available";
                const next = lines[dueIndex + 1];
                if (next) nextLine = `${next.text || ""}  (in ${((next.time - progress) / 1000).toFixed(1)}s)`;
            }
        }

        const nowMs = Date.now();
        const { enableMinInterval, minIntervalMs, enableMergeLines, mergeWindowMs, enableBackoff } = Settings_1.Settings.rateLimit;
        const minInterval = enableMinInterval ? (minIntervalMs || 5000) : 0;
        const rateLimitRemaining = statusChanger._rateLimitedUntil > nowMs ? ((statusChanger._rateLimitedUntil - nowMs) / 1000).toFixed(1) : null;
        const nextSendIn = statusChanger._lastSentAt > 0 ? Math.max(0, minInterval - (nowMs - statusChanger._lastSentAt)) : 0;

        const curOrder = Settings_1.Settings.sources?.sourceOrder;
        if (curOrder !== _cachedSourceOrderRef) {
            _cachedSourceOrderRef = curOrder;
            const ord = curOrder?.length ? curOrder : DEFAULT_ORDER;
            _cachedSourcesLine = ord.filter(n => Settings_1.Settings.sources[ENABLE_KEY[n]] !== false).map((n, i) => `${i + 1}.${n}`).join("  ");
        }

        const op3Used = gatewayClient._presenceSentTimes.filter(t => nowMs - t <= 20000).length;
        const gwStatus = Settings_1.Settings.gateway?.enabled
            ? (gatewayClient.connected
                ? `\x1b[32mGW\x1b[0m \x1b[90m${op3Used}/5\x1b[0m`
                : gatewayClient._reconnecting
                    ? `\x1b[33mGW reconnecting\x1b[0m`
                    : `\x1b[31mGW disconnected\x1b[0m`)
            : `\x1b[33mREST\x1b[0m`;
        const rateStatus = rateLimitRemaining ? `\x1b[31mRATE LIMITED ${rateLimitRemaining}s\x1b[0m`
            : nextSendIn <= 0 ? `\x1b[32mReady\x1b[0m`
            : `\x1b[33m${(nextSendIn / 1000).toFixed(1)}s\x1b[0m`;
        const durationSec = isFinite(playbackState.songDuration) ? +(playbackState.songDuration / 1000).toFixed(0) : 0;
        const savedRaw = statusChanger._savedStatus?.text || "";
        const savedLabel = savedRaw ? `\x1b[32m"${savedRaw.length > 60 ? savedRaw.slice(0, 57) + "..." : savedRaw}"\x1b[0m` : `\x1b[33mNone\x1b[0m`;
        const restoreStatus = Settings_1.Settings.restore?.enabled
            ? (statusChanger._restoreTimer ? `\x1b[33mPending\x1b[0m` : `\x1b[32mArmed\x1b[0m`) : `\x1b[31mOff\x1b[0m`;
        const playing = playbackState.isPlaying ? "\x1b[32m\u25b6 Playing\x1b[0m" : "\x1b[33m\u23f8 Paused\x1b[0m";
        const lyricsYN = playbackState.hasLyrics ? `\x1b[32m\u2713\x1b[0m ${lyricsFetcher.lastFetchedFrom}` : "\x1b[31m\u2717 None\x1b[0m";
        const dealerLine = useDealer
            ? (dealerClient?.connected ? `\x1b[32mDealer WS\x1b[0m` : `\x1b[33mDealer reconnecting\x1b[0m`)
            : `\x1b[33mREST poll\x1b[0m`;
        const sep = "  " + "\u2500".repeat(50);
        const lbl = s => `  \x1b[1m${s.padEnd(9)}\x1b[0m`;

        process.stdout.write("\x1b[H" + [
            `  \x1b[1mLyrics Status\x1b[0m`,
            sep,
            `${lbl("Song:")}${playbackState.songName || "Not listening"}`,
            `${lbl("Artist:")}${playbackState.songAuthor || "-"}    ${playing}`,
            `${lbl("Time:")}${statusChanger.formatSeconds(+(progress / 1000).toFixed(0))} / ${statusChanger.formatSeconds(durationSec)}    \x1b[1mSrc:\x1b[0m ${lyricsYN}`,
            `${lbl("Order:")}${_cachedSourcesLine}`,
            sep,
            `${lbl("Now:")}${dueLine}`,
            `${lbl("Next:")}${nextLine}`,
            sep,
            `${lbl("Sent:")}${statusChanger._lastSentText || "Nothing sent yet"}`,
            `${lbl("Send:")}${rateStatus}    \x1b[1mGW:\x1b[0m ${gwStatus}    \x1b[1mSpotify:\x1b[0m ${dealerLine}`,
            `${lbl("Restore:")}${restoreStatus}    \x1b[1mSaved:\x1b[0m ${savedLabel}`,
            sep,
            `${lbl("Interval:")}${enableMinInterval ? `\x1b[32m${((minIntervalMs||0)/1000).toFixed(1)}s\x1b[0m` : "\x1b[31mOff\x1b[0m"}    \x1b[1mMerge:\x1b[0m ${enableMergeLines ? `\x1b[32m${((mergeWindowMs||0)/1000).toFixed(1)}s\x1b[0m` : "\x1b[31mOff\x1b[0m"}    \x1b[1mBackoff:\x1b[0m ${enableBackoff ? "\x1b[32mOn\x1b[0m" : "\x1b[31mOff\x1b[0m"}`,
        ].map(r => r + "\x1b[K").join("\n") + "\n\x1b[J");
    }, 1000);

    (0, Server_1.startServer)();
    const Tray_1 = require('./Tray'); Tray_1.startTray(() => { try { _store?.close(); } catch(_){} process.exit(0); });
}

process.on("uncaughtException", e => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    if (!e.message.includes("fetch failed")) {
        console.error("\x1b[31m[lyrics-status] Fatal error: " + e.message + "\x1b[0m");
        console.error("Check log.txt for full details.");
        try { _store?.close(); } catch (_) {}
        process.exit(1);
    }
});
process.on("unhandledRejection", reason => {
    Debug_1.Debug.write(`[unhandledRejection] ${reason instanceof Error ? reason.stack : String(reason)}`);
});
