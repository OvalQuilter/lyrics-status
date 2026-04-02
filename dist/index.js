"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LyricsFetcher_1 = require("./LyricsFetcher");
const SpotifySource_1 = require("./Sources/SpotifySource");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const LrcLibSource_1 = require("./Sources/LrcLibSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
const MusixmatchSource_1 = require("./Sources/MusixmatchSource");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const Updater_1 = require("./Updater");
const SpotifyService_1 = require("./SpotifyService");
const uuid_1 = require("uuid");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
Settings_1.Settings.load();
if (Settings_1.Settings.update.enableAutoupdate) {
    Updater_1.Updater.tryUpdate()
        .then(() => { init(); })
        .catch((e) => { Debug_1.Debug.write("LyricsStatus failed to update. Error: " + e.stack); init(); });
} else {
    init();
}
function init() {
    if (!Settings_1.Settings.credentials.uuid) {
        Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)();
        Settings_1.Settings.save();
    }
    ExternalAuthServerAPI_1.ExternalAuthServerAPI.register();
    SpotifyService_1.SpotifyService.refresh();

    const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
    const src = Settings_1.Settings.sources;

    // Source class map — must match names used in sourceOrder and panel SOURCE_META.
    const SOURCE_MAP = {
        "Spotify":    () => new SpotifySource_1.SpotifySource(),
        "Musixmatch": () => new MusixmatchSource_1.MusixmatchSource(),
        "LrcLib":     () => new LrcLibSource_1.LrcLibSource(),
        "NetEase":    () => new NetEaseMusicSource_1.NetEaseMusicSource(),
        "QQMusic":    () => new QQMusicSource_1.QQMusicSource(),
    };
    const ENABLE_MAP = {
        "Spotify":    src.enableSpotify    !== false,
        "Musixmatch": src.enableMusixmatch !== false,
        "LrcLib":     src.enableLrcLib     !== false,
        "NetEase":    src.enableNetEase    !== false,
        "QQMusic":    src.enableQQMusic    !== false,
    };
    // Respect sourceOrder from settings (set by panel drag-and-drop).
    // Fall back to default order if missing or empty.
    const sourceOrder = (src.sourceOrder && src.sourceOrder.length)
        ? src.sourceOrder
        : ["Spotify", "Musixmatch", "LrcLib", "NetEase", "QQMusic"];

    const activeNames = [];
    for (const name of sourceOrder) {
        if (!SOURCE_MAP[name] || !ENABLE_MAP[name]) continue;
        lyricsFetcher.addSource(SOURCE_MAP[name]());
        activeNames.push(name);
    }
    Debug_1.Debug.write(`[init] Active lyric sources (in order): ${activeNames.join(", ")}`);

    const playbackState = new PlaybackState_1.PlaybackState();
    const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
    const statusChanger = new StatusChanger_1.StatusChanger(playbackState);

    // 5s Spotify polling
    setInterval(() => { playbackStateUpdater.update(); }, 5000);

    // 60fps progress + status change — no rendering here
    let now = Date.now();
    let _songEndedFired = false;
    let _lastKnownSongId = "";
    setInterval(() => {
        // Detect manual song skip: songId changed but ended never fired.
        // Clears sentLines and resets _lastSentAt so the new song starts fresh.
        // Only fire skip detection if the song wasn't already handled by the
        // ended path — avoids calling songChanged() twice on a natural song end.
        if (playbackState.songId && playbackState.songId !== _lastKnownSongId) {
            _lastKnownSongId = playbackState.songId;
            if (!_songEndedFired) statusChanger.songChanged();
        }
        statusChanger.changeStatus();
        playbackState.songProgress += Date.now() - now;
        now = Date.now();
        if (playbackState.ended) {
            if (!_songEndedFired) {
                _songEndedFired = true;
                statusChanger.songChanged();
            }
        } else {
            _songEndedFired = false;
        }
    }, 1000 / 60);

    // Clear screen once on startup so cursor positioning works from the start
    process.stdout.write("\x1b[2J\x1b[H");

    // 1s display refresh — completely separate from 60fps loop, no flicker
    setInterval(() => {
        const lyrics = playbackState.lyrics;
        const progress = playbackState.songProgress;
        const offset = Settings_1.Settings.timings.sendTimeOffset;

        let dueLine = "Not available";
        let nextLine = "Not available";
        if (lyrics && lyrics.lines && lyrics.lines.length > 0) {
            let dueIndex = -1;
            for (let i = 0; i < lyrics.lines.length; i++) {
                if (lyrics.lines[i].time <= progress + offset) { dueIndex = i; } else { break; }
            }
            if (dueIndex >= 0) {
                dueLine = lyrics.lines[dueIndex].text || "Not available";
                if (dueIndex + 1 < lyrics.lines.length) {
                    const next = lyrics.lines[dueIndex + 1];
                    nextLine = `${next.text || ""}  (in ${((next.time - progress) / 1000).toFixed(1)}s)`;
                }
            }
        }

        const nowMs = Date.now();
        const rateLimitedUntil = statusChanger._rateLimitedUntil || 0;
        const lastSentAt = statusChanger._lastSentAt || 0;
        const minInterval = Settings_1.Settings.rateLimit.enableMinInterval ? (Settings_1.Settings.rateLimit.minIntervalMs || 5000) : 0;
        const rateLimitRemaining = rateLimitedUntil > nowMs ? ((rateLimitedUntil - nowMs) / 1000).toFixed(1) : null;
        const nextSendIn = lastSentAt > 0 ? Math.max(0, minInterval - (nowMs - lastSentAt)) : 0;
        const mergeWindowSec = ((Settings_1.Settings.rateLimit?.mergeWindowMs || 0) / 1000).toFixed(1);
        const minIntervalSec = ((Settings_1.Settings.rateLimit?.minIntervalMs || 0) / 1000).toFixed(1);

        const ENABLE_KEY_MAP = {
            "Spotify": "enableSpotify", "Musixmatch": "enableMusixmatch",
            "LrcLib": "enableLrcLib", "NetEase": "enableNetEase", "QQMusic": "enableQQMusic"
        };
        const sourceOrder = (Settings_1.Settings.sources?.sourceOrder?.length)
            ? Settings_1.Settings.sources.sourceOrder
            : ["Spotify", "Musixmatch", "LrcLib", "NetEase", "QQMusic"];
        const enabledSources = sourceOrder.filter(n => Settings_1.Settings.sources[ENABLE_KEY_MAP[n]] !== false);
        const sourcesLine = enabledSources.map((n, i) => `${i + 1}.${n}`).join("  ");

        const rateStatus = rateLimitRemaining
            ? `\x1b[31mRATE LIMITED - resumes in ${rateLimitRemaining}s\x1b[0m`
            : nextSendIn <= 0 ? `\x1b[32mReady to send\x1b[0m`
            : `\x1b[33mNext send in ${(nextSendIn / 1000).toFixed(1)}s\x1b[0m`;

        const rows = [
            `\x1b[1m╔══════════════════════════════════════════════════════╗\x1b[0m`,
            `\x1b[1m  Lyrics Status                                       \x1b[0m`,
            `\x1b[1m╚══════════════════════════════════════════════════════╝\x1b[0m`,
            ``,
            `  \x1b[1mSong:\x1b[0m       ${playbackState.songName || "Not listening"}`,
            `  \x1b[1mArtist:\x1b[0m     ${playbackState.songAuthor || "-"}`,
            `  \x1b[1mProgress:\x1b[0m   ${statusChanger.formatSeconds(+(progress / 1000).toFixed(0))} / ${statusChanger.formatSeconds(+(playbackState.songDuration / 1000).toFixed(0))}`,
            `  \x1b[1mStatus:\x1b[0m     ${playbackState.isPlaying ? "\x1b[32mPlaying\x1b[0m" : "\x1b[33mPaused\x1b[0m"}`,
            `  \x1b[1mLyrics:\x1b[0m     ${playbackState.hasLyrics ? `\x1b[32mYes\x1b[0m (${lyricsFetcher.lastFetchedFrom})` : "\x1b[31mNo\x1b[0m"}`,
            `  \x1b[1mSources:\x1b[0m    ${sourcesLine}`,
            ``,
            `  \x1b[1m-- Lyrics --------------------------------------------------\x1b[0m`,
            `  \x1b[1mNow:\x1b[0m        ${dueLine}`,
            `  \x1b[1mNext:\x1b[0m       ${nextLine}`,
            ``,
            `  \x1b[1m-- Discord -------------------------------------------------\x1b[0m`,
            `  \x1b[1mLast sent:\x1b[0m  ${statusChanger._lastSentText || "Nothing sent yet"}`,
            `  \x1b[1mSend:\x1b[0m       ${rateStatus}`,
            ``,
            `  \x1b[1m-- Settings ------------------------------------------------\x1b[0m`,
            `  \x1b[1mMin interval:\x1b[0m ${Settings_1.Settings.rateLimit.enableMinInterval ? `\x1b[32m${minIntervalSec}s\x1b[0m` : "\x1b[31mOff\x1b[0m"}`,
            `  \x1b[1mMerge window:\x1b[0m ${Settings_1.Settings.rateLimit.enableMergeLines ? `\x1b[32m${mergeWindowSec}s\x1b[0m` : "\x1b[31mOff\x1b[0m"}`,
            `  \x1b[1mAuto backoff:\x1b[0m ${Settings_1.Settings.rateLimit.enableBackoff ? "\x1b[32mOn\x1b[0m" : "\x1b[31mOff\x1b[0m"}`,
            ``
        ];

        // Move cursor to top-left then overwrite each line — no scroll, no flicker
        process.stdout.write("\x1b[H" + rows.map(r => r + "\x1b[K").join("\n") + "\n");
    }, 1000);

    (0, Server_1.startServer)();
}
process.on("uncaughtException", (e) => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    if (!e.message.includes("fetch failed")) process.exit(1);
});
