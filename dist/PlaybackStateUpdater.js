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
exports.PlaybackStateUpdater = void 0;
const SpotifyAccessToken_1 = require("./SpotifyAccessToken");
class PlaybackStateUpdater {
    constructor(playbackState, lyricsFetcher) {
        this.playbackState = playbackState;
        this.lyricsFetcher = lyricsFetcher;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + SpotifyAccessToken_1.SpotifyAccessToken.token
                }
            });
            if (request.status === 401)
                return yield SpotifyAccessToken_1.SpotifyAccessToken.refresh();
            if (request.status === 200) {
                const json = yield request.json();
                const playbackState = this.playbackState;
                if (playbackState.songId !== json.item.id) {
                    playbackState.songName = json.item.name.replace(/ \(.+\)/, "");
                    playbackState.songAuthor = json.item.artists[0].name;
                    playbackState.oldSongId = playbackState.songId;
                    playbackState.songId = json.item.id;
                    playbackState.songDuration = json.item.duration_ms;
                    playbackState.lyrics = yield this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                    playbackState.hasLyrics = !!playbackState.lyrics;
                }
                if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                    // If song switches, and we didn't get lyrics of previous song, wrong lyrics may set. Check for wrong lyrics and set correct lyrics
                    playbackState.lyrics = yield this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                }
                playbackState.songProgress = json.progress_ms;
                playbackState.isPlaying = json.is_playing;
            }
        });
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
