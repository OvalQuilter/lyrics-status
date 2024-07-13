"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LyricsFetcher_1 = require("./LyricsFetcher");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
const PlaybackStateUpdater_1 = require("./PlaybackStateUpdater");
const PlaybackState_1 = require("./PlaybackState");
const StatusChanger_1 = require("./StatusChanger");
const SpotifyAccessToken_1 = require("./SpotifyAccessToken");
const Debug_1 = require("./Debug");
const Server_1 = require("./Panel/Server");
const Settings_1 = require("./Settings");
const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
lyricsFetcher.addSource(new NetEaseMusicSource_1.NetEaseMusicSource());
lyricsFetcher.addSource(new QQMusicSource_1.QQMusicSource());
const playbackState = new PlaybackState_1.PlaybackState();
const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
const statusChanger = new StatusChanger_1.StatusChanger(playbackState);
SpotifyAccessToken_1.SpotifyAccessToken.refresh();
Settings_1.Settings.load();
setInterval(() => {
    playbackStateUpdater.update();
    //console.log(playbackState)
    //console.log(statusChanger, playbackStateUpdater, SpotifyAccessToken)
}, 1500);
setInterval(() => {
    statusChanger.changeStatus();
    playbackState.songProgress += 100;
    console.clear();
    console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Lyrics: ${(playbackState.currentLine && playbackState.currentLine.text) || "Not available"}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `);
}, 100);
(0, Server_1.startServer)();
process.on("uncaughtException", (e) => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    if (!e.message.includes("fetch failed")) {
        process.exit(1);
    }
});
