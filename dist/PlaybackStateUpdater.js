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

    /**
     * Handle a player_state payload pushed from the Spotify dealer WebSocket.
     * This is the primary update path when useDealer=true. Also called as a
     * one-shot fetch after dealer connects to populate initial state.
     */
    async applyDealerState(playerState) {
        const ps = this.playbackState;
        if (!playerState) return;

        const track = playerState.track;
        if (!track) {
            ps.isPlaying = playerState.is_playing ?? false;
            return;
        }

        const progressMs = parseInt(playerState.position_as_of_timestamp || "0", 10);
        const t0 = Date.now();
        ps.isPlaying = playerState.is_playing ?? false;
        ps.songProgress = progressMs + (Date.now() - t0);

        const trackId = track.uri?.split(":track:")[1] || track.id || "";
        Debug_1.Debug.write(`[PlaybackStateUpdater][Dealer] isPlaying:${ps.isPlaying} | track: "${track.name}" | progress: ${progressMs}ms`);

        if (ps.songId !== trackId) {
            ps.songName   = track.name || "";
            ps.songAuthor = track.artists?.[0]?.name || track.artist?.name || "Unknown";
            ps.oldSongId  = ps.songId;
            ps.songId     = trackId;
            ps.songDuration = parseInt(track.duration || track.duration_ms || "0", 10);
            ps.albumArtUrl  = track.album?.images?.[0]?.url || track.image_url || "";
            const _epochDealer = Date.now() - progressMs; // CONN-22: capture before fetchLyrics await
            ps.songStartEpoch = _epochDealer;
            Debug_1.Debug.write(`[PlaybackStateUpdater][Dealer] New track: "${ps.songName}" by ${ps.songAuthor}`);
            ps.lyrics = null; ps.hasLyrics = false; ps.currentLine = null; // #14: clear before await so old lyrics don't bleed
            try {
                ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, trackId);
                ps.currentLine = null; ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || "";
            } catch (e) {
                Debug_1.Debug.write("[PlaybackStateUpdater][Dealer] fetchLyrics error: " + e);
                ps.lyrics = null; ps.hasLyrics = false; ps.lyricsSource = "";
            }
        } else if (!ps.lyrics) {
            // #17: only retry fetch when lyrics are absent — not on every seek/pause push
            this.lyricsFetcher.lastAttemptedFor = "";
            try {
                ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, trackId);
                ps.currentLine = null; ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || "";
            } catch (e) { Debug_1.Debug.write("[PlaybackStateUpdater][Dealer] fetchLyrics retry error: " + e); ps.lyrics = null; ps.hasLyrics = false; }
        }
        // #17: removed lastAttemptedFor else-if branch — same-song seek/pause events no longer trigger redundant fetches
    }

    /**
     * REST polling update — original behaviour.
     * Used when useDealer=false, or as a periodic sync/fallback when dealer is connected
     * (runs every 30s in dealer mode to keep progress in sync).
     */
    async update() {
        if (this._updating) return; this._updating = true;
        try {
        Debug_1.Debug.write(`[PlaybackStateUpdater] Polling Spotify API...`);
        const res = await fetch("https://api.spotify.com/v1/me/player", {
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + SpotifyService_1.SpotifyService.getBearerToken() }
        });
        const t0 = Date.now();
        Debug_1.Debug.write(`[PlaybackStateUpdater] Spotify API response: HTTP ${res.status}`);
        if (res.status === 401 || res.status === 400) {
            Debug_1.Debug.write(`[PlaybackStateUpdater] Auth error (${res.status}) — refreshing token`);
            const { spotifyWebToken: wt, spotifyWebTokenExpiry: exp } = Settings_1.Settings.credentials;
            if (wt && Date.now() < (exp || 0)) { Settings_1.Settings.credentials.spotifyWebTokenExpiry = 0; return; }
            if (Settings_1.Settings.credentials.useExternalAuthServer) {
                SpotifyService_1.SpotifyService.token = (await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken()) || "";
            } else { await SpotifyService_1.SpotifyService.refresh(); }
            // Retry immediately after token refresh instead of waiting for next poll interval
            setTimeout(() => this.update().catch(() => {}), 1000);
            return;
        }
        if (res.status !== 200) return;
        const _t0REST = Date.now(); // CONN-33: capture before json() parse latency
        let json;
        try { json = await res.json(); } catch (e) { Debug_1.Debug.write(`[PlaybackStateUpdater] Failed to parse response: ${e}`); return; }
        const ps = this.playbackState;
        if (!json.item) { ps.isPlaying = json.is_playing ?? false; return; }
        ps.songProgress = (json.progress_ms || 0) + (Date.now() - _t0REST);
        ps.isPlaying = json.is_playing;
        Debug_1.Debug.write(`[PlaybackStateUpdater] isPlaying:${json.is_playing} | song: "${json.item.name}" | progress: ${json.progress_ms}ms`);
        if (ps.songId !== json.item.id) {
            ps.songName = json.item.name;
            ps.songAuthor = json.item.artists?.[0]?.name ?? "Unknown";
            ps.oldSongId = ps.songId; ps.songId = json.item.id; ps.songDuration = json.item.duration_ms;
            ps.albumArtUrl = json.item.album?.images?.[0]?.url || "";
            ps.songStartEpoch = _t0REST - (json.progress_ms || 0); // CONN-33
            Debug_1.Debug.write(`[PlaybackStateUpdater] New song: "${ps.songName}" by ${ps.songAuthor}`);
            ps.lyrics = null; ps.hasLyrics = false; ps.currentLine = null; // #14: clear before await so old lyrics don't bleed
            try { ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, json.item.id); ps.currentLine = null; ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || ""; Debug_1.Debug.write(`[PlaybackStateUpdater] Lyrics: ${ps.hasLyrics} | source: ${ps.lyricsSource}`); } catch (e) { Debug_1.Debug.write("[PlaybackStateUpdater] fetchLyrics new-song error: " + e); ps.lyrics = null; ps.hasLyrics = false; ps.lyricsSource = ""; }
        } else if (!ps.lyrics) {
            Debug_1.Debug.write(`[PlaybackStateUpdater] lyrics null for current song — re-fetching`);
            this.lyricsFetcher.lastAttemptedFor = "";
            try { ps.lyrics = await this.lyricsFetcher.fetchLyrics(ps.songName, ps.songAuthor, json.item.id); ps.currentLine = null; ps.hasLyrics = !!ps.lyrics; ps.lyricsSource = this.lyricsFetcher.lastFetchedFrom || ""; Debug_1.Debug.write(`[PlaybackStateUpdater] Re-fetch result: ${ps.hasLyrics} | source: ${ps.lyricsSource}`); } catch (e) { Debug_1.Debug.write("[PlaybackStateUpdater] fetchLyrics re-fetch error: " + e); ps.lyrics = null; ps.hasLyrics = false; }
        }
        // #17: removed lastAttemptedFor else-if branch from REST path too — same-song polls no longer re-fetch
        } finally { this._updating = false; }
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
