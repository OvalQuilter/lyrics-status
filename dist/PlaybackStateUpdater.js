"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackStateUpdater = void 0;
const SpotifyService_1 = require("./SpotifyService");
const Settings_1 = require("./Settings");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
const Debug_1 = require("./Debug");

class PlaybackStateUpdater {
    constructor(playbackState, lyricsFetcher) { this.playbackState = playbackState; this.lyricsFetcher = lyricsFetcher; }
    async update() {
        Debug_1.Debug.write(`[PlaybackStateUpdater] Polling Spotify API...`);
        const res = await fetch("https://api.spotify.com/v1/me/player", {
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + SpotifyService_1.SpotifyService.getBearerToken() }
        });
        // Bug 12 fix: capture t0 after response received so only deserialization time is added
        const t0 = Date.now();
        Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify API response: HTTP ${res.status}`);
        if (res.status === 401 || res.status === 400) {
            Debug_1.Debug.write(`[PlaybackStateUpdater] Auth error (${res.status}) — refreshing token`);
            const { spotifyWebToken: wt, spotifyWebTokenExpiry: exp } = Settings_1.Settings.credentials;
            if (wt && Date.now() < (exp || 0)) { Settings_1.Settings.credentials.spotifyWebTokenExpiry = 0; return; }
            if (Settings_1.Settings.credentials.useExternalAuthServer) {
                SpotifyService_1.SpotifyService.token = (await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken()) || "";
            } else { await SpotifyService_1.SpotifyService.refresh(); }
            return;
        }
        if (res.status === 204) { Debug_1.Debug.write(`[PlaybackStateUpdater] 204 — nothing playing`); return; }
        if (res.status !== 200) return;
        let json;
        try { json = await res.json(); } catch (e) { Debug_1.Debug.write(`[PlaybackStateUpdater] Failed to parse response: ${e}`); return; }
        const ps = this.playbackState;
        if (!json.item) { ps.isPlaying = json.is_playing ?? false; return; }
        ps.songProgress = (json.progress_ms || 0) + (Date.now() - t0);
        ps.isPlaying = json.is_playing;
        Debug_1.Debug.write(`[PlaybackStateUpdater] isPlaying:${json.is_playing} | song: "${json.item.name}" | progress: ${json.progress_ms}ms`);
        if (ps.songId !== json.item.id) {
            ps.songName = json.item.name.replace(/ \(.+\)/, "");
            ps.songAuthor = json.item.artists?.[0]?.name ?? "Unknown";
            ps.oldSongId = ps.songId; ps.songId = json.item.id; ps.songDuration = json.item.duration_ms;
            Debug_1.Debug.write(`[PlaybackStateUpdater] New song: "${ps.songName}" by ${ps.songAuthor}`);
            ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, json.item.id);
            ps.currentLine = null; ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || "";
            Debug_1.Debug.write(`[PlaybackStateUpdater] Lyrics: ${ps.hasLyrics} | source: ${ps.lyricsSource}`);
        } else if (this.lyricsFetcher.lastAttemptedFor !== (ps.songName + ps.songAuthor)) {
            ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, json.item.id);
            ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || "";
        }
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
