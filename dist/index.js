"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LyricsFetcher_1 = require("./LyricsFetcher");
const SpotifySource_1 = require("./Sources/SpotifySource");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const Updater_1 = require("./Updater");
const SpotifyService_1 = require("./SpotifyService");
Settings_1.Settings.load();
if (Settings_1.Settings.update.enableAutoupdate) {
    Updater_1.Updater.tryUpdate()
        .then(() => {
        init();
    })
        .catch((e) => {
        Debug_1.Debug.write("LyricsStatus failed to update. Error: " + e.stack);
        init();
    });
}
else {
    init();
}
function init() {
    SpotifyService_1.SpotifyService.refresh();
    const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
    lyricsFetcher.addSource(new SpotifySource_1.SpotifySource());
    lyricsFetcher.addSource(new NetEaseMusicSource_1.NetEaseMusicSource());
    lyricsFetcher.addSource(new QQMusicSource_1.QQMusicSource());
    const playbackState = new PlaybackState_1.PlaybackState();
    const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
    const statusChanger = new StatusChanger_1.StatusChanger(playbackState);
    setInterval(() => {
        playbackStateUpdater.update();
        //console.log(playbackState)
        //console.log(statusChanger, playbackStateUpdater, SpotifyAccessToken)
    }, 1500);
    let now = Date.now();
    setInterval(() => {
        statusChanger.changeStatus();
        playbackState.songProgress += Date.now() - now;
        if (playbackState.ended)
            statusChanger.songChanged();
        console.clear();
        console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Song progress: ${statusChanger.formatSeconds(+(playbackState.songProgress / 1000).toFixed(0))}
    Current lyrics: ${(playbackState.currentLine && playbackState.currentLine.text) || "Not available"}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `);
        now = Date.now();
    }, 1000 / 60);
    (0, Server_1.startServer)();
}
process.on("uncaughtException", (e) => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    if (!e.message.includes("fetch failed")) {
        process.exit(1);
    }
});
