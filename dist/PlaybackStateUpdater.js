"use strict";
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
    getBearerToken() {
        const wt  = Settings_1.Settings.credentials.spotifyWebToken;
        const exp = Settings_1.Settings.credentials.spotifyWebTokenExpiry || 0;
        if (wt && Date.now() < exp) return wt;
        return SpotifyService_1.SpotifyService.token;
    }
    async update() {
        const roundTripTimeStart = Date.now();
        Debug_1.Debug.write(`[PlaybackStateUpdater] Polling Spotify API...`);
        const request = await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.getBearerToken()
            }
        });
        Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify API response: HTTP ${request.status}`);
        if (request.status === 401 || request.status === 400) {
            Debug_1.Debug.write(`[PlaybackStateUpdater] Auth error (${request.status}) - refreshing token`);
            const wt  = Settings_1.Settings.credentials.spotifyWebToken;
            const exp = Settings_1.Settings.credentials.spotifyWebTokenExpiry || 0;
            if (wt && Date.now() < exp) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] Web token returned 401 — marking as expired`);
                Settings_1.Settings.credentials.spotifyWebTokenExpiry = 0;
                return;
            }
            if (Settings_1.Settings.credentials.useExternalAuthServer) {
                SpotifyService_1.SpotifyService.token = (await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken()) || "";
                Debug_1.Debug.write(`[PlaybackStateUpdater] Got new token from external auth server: ${!!SpotifyService_1.SpotifyService.token}`);
            } else {
                Debug_1.Debug.write(`[PlaybackStateUpdater] Calling SpotifyService.refresh()`);
                return await SpotifyService_1.SpotifyService.refresh();
            }
        }
        if (request.status === 200) {
            const json = await request.json();
            const playbackState = this.playbackState;
            if (!json.item) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] json.item is null — skipping song update (podcast or local file?)`);
                playbackState.isPlaying = json.is_playing ?? false;
                return;
            }
            playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart);
            playbackState.isPlaying = json.is_playing;
            Debug_1.Debug.write(`[PlaybackStateUpdater] isPlaying:${json.is_playing} | song: "${json.item.name}" | progress: ${json.progress_ms}ms`);
            if (playbackState.songId !== json.item.id) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] New song detected: "${json.item.name}" by ${json.item.artists?.[0]?.name ?? "Unknown"}`);
                playbackState.songName = json.item.name.replace(/ \(.+\)/, "");
                playbackState.songAuthor = json.item.artists?.[0]?.name ?? "Unknown";
                playbackState.oldSongId = playbackState.songId;
                playbackState.songId = json.item.id;
                playbackState.songDuration = json.item.duration_ms;
                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                playbackState.currentLine = null;
                playbackState.hasLyrics = !!playbackState.lyrics;
                Debug_1.Debug.write(`[PlaybackStateUpdater] Lyrics fetched: ${playbackState.hasLyrics} | source: ${this.lyricsFetcher.lastFetchedFrom}`);
            }
            if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                Debug_1.Debug.write(`[PlaybackStateUpdater] Lyrics not yet fetched for current song — retrying`);
                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                playbackState.hasLyrics = !!playbackState.lyrics;
            }
        }
        if (request.status === 204) {
            Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify returned 204 - nothing playing`);
        }
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
