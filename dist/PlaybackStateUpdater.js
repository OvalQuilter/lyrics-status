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
const SpotifyService_1 = require("./SpotifyService");
const Settings_1 = require("./Settings");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
const Debug_1 = require("./Debug");
class PlaybackStateUpdater {
    constructor(playbackState, lyricsFetcher) {
        this.playbackState = playbackState;
        this.lyricsFetcher = lyricsFetcher;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const roundTripTimeStart = Date.now();
            Debug_1.Debug.write(`[PlaybackStateUpdater] Polling Spotify API...`);
            const request = yield fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + SpotifyService_1.SpotifyService.token
                }
            });
            Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify API response: HTTP ${request.status}`);
            if (request.status === 401 || request.status === 400) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] Auth error (${request.status}) - refreshing token`);
                if (Settings_1.Settings.credentials.useExternalAuthServer) {
                    SpotifyService_1.SpotifyService.token = (yield ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken()) || "";
                    Debug_1.Debug.write(`[PlaybackStateUpdater] Got new token from external auth server: ${!!SpotifyService_1.SpotifyService.token}`);
                }
                else {
                    Debug_1.Debug.write(`[PlaybackStateUpdater] Calling SpotifyService.refresh()`);
                    return yield SpotifyService_1.SpotifyService.refresh();
                }
            }
            if (request.status === 200) {
                const json = yield request.json();
                const playbackState = this.playbackState;
                playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart);
                playbackState.isPlaying = json.is_playing;
                Debug_1.Debug.write(`[PlaybackStateUpdater] isPlaying:${json.is_playing} | song: "${json.item && json.item.name}" | progress: ${json.progress_ms}ms`);
                if (playbackState.songId !== (json.item && json.item.id)) {
                    Debug_1.Debug.write(`[PlaybackStateUpdater] New song detected: "${json.item && json.item.name}" by ${json.item && json.item.artists && json.item.artists[0] && json.item.artists[0].name}`);
                    playbackState.songName = json.item.name.replace(/ \(.+\)/, "");
                    playbackState.songAuthor = (json.item.artists && json.item.artists[0] && json.item.artists[0].name) || "Unknown";
                    playbackState.oldSongId = playbackState.songId;
                    playbackState.songId = json.item.id;
                    playbackState.songDuration = json.item.duration_ms;
                    playbackState.lyrics = yield this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                    playbackState.currentLine = null;
                    playbackState.hasLyrics = !!playbackState.lyrics;
                    Debug_1.Debug.write(`[PlaybackStateUpdater] Lyrics fetched: ${playbackState.hasLyrics} | source: ${this.lyricsFetcher.lastFetchedFrom}`);
                }
            }
            if (request.status === 204) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify returned 204 - nothing playing`);
            }
        });
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;