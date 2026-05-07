"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LyricsFetcher_1 = require("./LyricsFetcher");
const LrcLibSource_1 = require("./Sources/LrcLibSource");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const Updater_1 = require("./Updater");
const uuid_1 = require("uuid");
// ─── Bootstrap ────────────────────────────────────────────────────────────────
Settings_1.Settings.load();
if (Settings_1.Settings.update.enableAutoupdate) {
    Updater_1.Updater.tryUpdate()
        .then(init)
        .catch((e) => {
        Debug_1.Debug.write(`Auto-update failed: ${e.stack}`);
        init();
    });
}
else {
    init();
}
// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
    // Ensure a stable UUID exists for this installation
    if (!Settings_1.Settings.credentials.uuid) {
        Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)();
        Settings_1.Settings.save();
    }
    // Lyrics sources — tried in order, first success wins
    const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
    lyricsFetcher.addSource(new LrcLibSource_1.LrcLibSource()); // best synced-LRC coverage
    lyricsFetcher.addSource(new NetEaseMusicSource_1.NetEaseMusicSource()); // large Chinese + global catalogue
    lyricsFetcher.addSource(new QQMusicSource_1.QQMusicSource()); // last resort
    const playbackState = new PlaybackState_1.PlaybackState();
    const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
    const statusChanger = new StatusChanger_1.StatusChanger(playbackState);
    // Poll Spotify (via Discord token) every 2 s to detect song changes
    setInterval(() => playbackStateUpdater.update(), 2000);
    // 60 fps loop: advance local progress counter + fire status updates
    let lastTick = Date.now();
    setInterval(() => {
        var _a, _b;
        const now = Date.now();
        const delta = now - lastTick;
        lastTick = now;
        playbackState.songProgress += delta;
        statusChanger.changeStatus();
        if (playbackState.ended)
            statusChanger.songChanged();
        console.clear();
        console.log(`  Song:    ${playbackState.songName || "—"}\n` +
            `  Artist:  ${playbackState.songAuthor || "—"}\n` +
            `  Time:    ${statusChanger.formatSeconds(Math.floor(playbackState.songProgress / 1000))}\n` +
            `  Lyrics:  ${(_b = (_a = playbackState.currentLine) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : "—"}\n` +
            `  Source:  ${lyricsFetcher.lastFetchedFrom}`);
    }, 1000 / 60);
    (0, Server_1.startServer)();
}
// ─── Error handling ───────────────────────────────────────────────────────────
process.on("uncaughtException", (e) => {
    var _a;
    Debug_1.Debug.write(`${e.stack}\n${(_a = e.cause) !== null && _a !== void 0 ? _a : ""}`);
    // Network errors are transient — keep running
    if (!e.message.includes("fetch failed"))
        process.exit(1);
});
