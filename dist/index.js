"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LyricsFetcher_1 = require("./LyricsFetcher");
const SpotifySource_1 = require("./Sources/SpotifySource");
const NetEaseMusicSource_1 = require("./Sources/NetEaseMusicSource");
const LrcLibSource_1 = require("./Sources/LrcLibSource");
const QQMusicSource_1 = require("./Sources/QQMusicSource");
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
const Translation_1 = require("./Translation");
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!Settings_1.Settings.credentials.uuid) {
            Settings_1.Settings.credentials.uuid = (0, uuid_1.v4)();
            Settings_1.Settings.save();
        }
        ExternalAuthServerAPI_1.ExternalAuthServerAPI.register();
        SpotifyService_1.SpotifyService.refresh();
        const lyricsFetcher = new LyricsFetcher_1.LyricsFetcher();
        lyricsFetcher.addSource(new SpotifySource_1.SpotifySource());
        lyricsFetcher.addSource(new LrcLibSource_1.LrcLibSource());
        lyricsFetcher.addSource(new NetEaseMusicSource_1.NetEaseMusicSource());
        lyricsFetcher.addSource(new QQMusicSource_1.QQMusicSource());
        const playbackState = new PlaybackState_1.PlaybackState();
        const playbackStateUpdater = new PlaybackStateUpdater_1.PlaybackStateUpdater(playbackState, lyricsFetcher);
        const statusChanger = new StatusChanger_1.StatusChanger(playbackState);
        setInterval(() => {
            playbackStateUpdater.update();
            //console.log(playbackState)
            //console.log(statusChanger, playbackStateUpdater, SpotifyAccessToken)
        }, 5000);
        let now = Date.now();
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            statusChanger.changeStatus();
            playbackState.songProgress += Date.now() - now;
            if (playbackState.ended)
                statusChanger.songChanged();
            let currentText = (playbackState.currentLine && playbackState.currentLine.text) || "Not available";
            if (Settings_1.Settings.translation.enableTranslation && playbackState.currentLine) {
                try {
                    currentText = yield (0, Translation_1.translateLyrics)(playbackState.currentLine.text, Settings_1.Settings.translation.translationLanguage);
                }
                catch (e) {
                    Debug_1.Debug.write("Translation failed: " + e.message);
                }
            }
            console.clear();
            console.log(`
    Song: ${playbackState.songName || "Not listening"}
    Author: ${playbackState.songAuthor || "Not listening"}
    Song progress: ${statusChanger.formatSeconds(+(playbackState.songProgress / 1000).toFixed(0))}
    Current lyrics: ${currentText}
    Lyrics fetched from: ${lyricsFetcher.lastFetchedFrom}
    `);
            now = Date.now();
        }), 1000 / 60);
        (0, Server_1.startServer)();
    });
}
process.on("uncaughtException", (e) => {
    Debug_1.Debug.write(e.stack + "\n" + e.cause);
    if (!e.message.includes("fetch failed")) {
        process.exit(1);
    }
});
