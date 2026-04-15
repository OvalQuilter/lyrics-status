"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackStateUpdater = void 0;
const SpotifyService_1 = require("./SpotifyService");
const Settings_1 = require("./Settings");
const ExternalAuthServerAPI_1 = require("./ExternalAuthServerAPI");
const Debug_1 = require("./Debug");
class PlaybackStateUpdater {
    constructor(playbackState, lyricsFetcher) {
        // Rate limiting backoff state
        this.rateLimitedUntil = 0;
        this.playbackState = playbackState;
        this.lyricsFetcher = lyricsFetcher;
    }
    async update() {
        // Skip if rate limited
        if (Date.now() < this.rateLimitedUntil) {
            return;
        }
        const roundTripTimeStart = Date.now();
        // DIAGNOSTIC: Log token status
        console.log(`[DEBUG] PlaybackStateUpdater.update() called`);
        console.log(`[DEBUG] Token present: ${SpotifyService_1.SpotifyService.token ? 'YES (' + SpotifyService_1.SpotifyService.token.substring(0, 10) + '...)' : 'NO - EMPTY!'}`);
        try {
            const request = await fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + SpotifyService_1.SpotifyService.token
                }
            });
            // DIAGNOSTIC: Log response status
            console.log(`[DEBUG] Spotify API response status: ${request.status}`);
            // Handle 204 No Content (no active device or nothing playing)
            if (request.status === 204) {
                Debug_1.Debug.write("PlaybackStateUpdater: No active playback (204)");
                this.playbackState.isPlaying = false;
                this.playbackState.spotifyConnected = true; // API works, just nothing playing
                return;
            }
            // Handle 429 Rate Limit - CRITICAL FIX
            if (request.status === 429) {
                const retryAfter = request.headers.get('Retry-After');
                const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 5;
                this.rateLimitedUntil = Date.now() + (waitSeconds * 1000); // Set backoff
                Debug_1.Debug.write(`PlaybackStateUpdater: Rate limited (429), waiting ${waitSeconds}s`);
                console.log(`[DEBUG] Rate limited! Waiting ${waitSeconds} seconds before retry`);
                this.playbackState.spotifyConnected = true;
                return;
            }
            if (request.status === 401 || request.status === 400) {
                Debug_1.Debug.write(`Spotify API returned ${request.status}, attempting token refresh...`);
                if (Settings_1.Settings.credentials.useExternalAuthServer) {
                    SpotifyService_1.SpotifyService.token = await ExternalAuthServerAPI_1.ExternalAuthServerAPI.getToken() || "";
                    if (!SpotifyService_1.SpotifyService.token) {
                        Debug_1.Debug.write("External auth server failed to provide token");
                        this.playbackState.spotifyConnected = false;
                        return;
                    }
                }
                else {
                    const refreshSuccess = await SpotifyService_1.SpotifyService.refresh();
                    if (!refreshSuccess) {
                        Debug_1.Debug.write("Token refresh failed - Spotify disconnected");
                        this.playbackState.spotifyConnected = false;
                        return;
                    }
                }
                // Retry after refresh but wait to avoid loops
                await new Promise(resolve => setTimeout(resolve, 500));
                return this.update();
            }
            if (request.status === 200) {
                const text = await request.text();
                if (!text) {
                    Debug_1.Debug.write("PlaybackStateUpdater: Empty response body");
                    this.playbackState.isPlaying = false;
                    return;
                }
                const json = JSON.parse(text);
                const playbackState = this.playbackState;
                // Check if there's an active track
                if (!json.item) {
                    Debug_1.Debug.write("PlaybackStateUpdater: No active track (item is null)");
                    playbackState.isPlaying = false;
                    return;
                }
                playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart);
                playbackState.isPlaying = json.is_playing;
                playbackState.spotifyConnected = true;
                Debug_1.Debug.write(`PlaybackStateUpdater: ${json.item.name} - ${json.is_playing ? 'playing' : 'paused'}`);
                if (playbackState.songId !== json.item.id) {
                    playbackState.songName = json.item.name.replace(/ \(.+\)/, "");
                    playbackState.songAuthor = json.item.artists[0].name;
                    playbackState.oldSongId = playbackState.songId;
                    playbackState.songId = json.item.id;
                    playbackState.songUri = json.item.uri; // Store the Spotify URI
                    // Get album art (prefer 300x300 size, fallback to first available)
                    const images = json.item.album?.images || [];
                    playbackState.albumArt = images.find(img => img.height === 300)?.url || images[0]?.url || "";
                    playbackState.songDuration = json.item.duration_ms;
                    playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                    playbackState.currentLine = null;
                    playbackState.hasLyrics = !!(playbackState.lyrics && playbackState.lyrics.lines && playbackState.lyrics.lines.length > 0);
                }
                if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                    // If song switches, and we didn't get lyrics of previous song yet, wrong lyrics may set. Check for wrong lyrics and set correct lyrics
                    playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor);
                }
            }
        }
        catch (error) {
            Debug_1.Debug.write(`PlaybackStateUpdater: Error - ${error.message}`);
            this.playbackState.spotifyConnected = false;
        }
    }
}
exports.PlaybackStateUpdater = PlaybackStateUpdater;
