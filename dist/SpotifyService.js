"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyService = void 0;
const Settings_1 = require("./Settings");
const Debug_1 = require("./Debug");
// Token expiration tracking
let tokenExpiresAt = 0;
class SpotifyService {
    static async exchange() {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            "headers": {
                "Authorization": `Basic ${Buffer.from(`${Settings_1.Settings.credentials.clientID}:${Settings_1.Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                client_id: Settings_1.Settings.credentials.clientID,
                grant_type: "authorization_code",
                code: Settings_1.Settings.credentials.code,
                redirect_uri: Settings_1.Settings.credentials.customRedirectUri
            }).toString(),
            "method": "POST"
        });
        if (!request.ok) {
            Debug_1.Debug.write(`Spotify exchange failed: ${request.status} ${request.statusText}`);
            return;
        }
        const json = await request.json();
        this.token = json.access_token;
        tokenExpiresAt = Date.now() + 3500000; // ~58 minutes (tokens last 1 hour)
        // DIAGNOSTIC: Log token set
        console.log(`[DEBUG] Token exchanged, length: ${this.token.length}, first 10 chars: ${this.token.substring(0, 10)}...`);
        Settings_1.Settings.credentials.refreshToken = json.refresh_token;
        Settings_1.Settings.save(); // Persist refresh token immediately
        Debug_1.Debug.write("Spotify token exchanged successfully");
    }
    static async refresh(retryCount = 0) {
        const maxRetries = 3;
        const backoffMs = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        try {
            const request = await fetch("https://accounts.spotify.com/api/token", {
                "headers": {
                    "Authorization": `Basic ${Buffer.from(`${Settings_1.Settings.credentials.clientID}:${Settings_1.Settings.credentials.clientSecret}`).toString('base64')}`,
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: Settings_1.Settings.credentials.refreshToken,
                    redirect_uri: Settings_1.Settings.credentials.customRedirectUri
                }).toString(),
                "method": "POST"
            });
            if (!request.ok) {
                Debug_1.Debug.write(`Spotify refresh failed: ${request.status} ${request.statusText}`);
                // Retry with backoff for recoverable errors
                if (retryCount < maxRetries && (request.status >= 500 || request.status === 429)) {
                    Debug_1.Debug.write(`Retrying in ${backoffMs}ms (attempt ${retryCount + 1}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, backoffMs));
                    return this.refresh(retryCount + 1);
                }
                return false;
            }
            const json = await request.json();
            this.token = json.access_token;
            tokenExpiresAt = Date.now() + 3500000; // ~58 minutes
            // DIAGNOSTIC: Log token refresh
            console.log(`[DEBUG] Token refreshed, length: ${this.token.length}, first 10 chars: ${this.token.substring(0, 10)}...`);
            if (json.refresh_token) {
                Settings_1.Settings.credentials.refreshToken = json.refresh_token;
                Settings_1.Settings.save(); // Persist new refresh token
            }
            Debug_1.Debug.write("Spotify token refreshed successfully");
            return true;
        }
        catch (error) {
            Debug_1.Debug.write(`Spotify refresh error: ${error.message}`);
            if (retryCount < maxRetries) {
                Debug_1.Debug.write(`Retrying in ${backoffMs}ms (attempt ${retryCount + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, backoffMs));
                return this.refresh(retryCount + 1);
            }
            return false;
        }
    }
    static isTokenExpired() {
        return Date.now() >= tokenExpiresAt;
    }
    /**
     * Ensure we have a valid token, refreshing if needed
     * @returns true if token is valid, false if refresh failed
     */
    static async ensureToken() {
        if (!this.token || this.isTokenExpired()) {
            const refreshed = await this.refresh();
            if (!refreshed) {
                Debug_1.Debug.write("ensureToken: Token refresh failed");
                return false;
            }
        }
        return true;
    }
    /**
     * Play a specific track on Spotify
     * @param trackUri - Spotify track URI (e.g., "spotify:track:4iV5W9uYEdYUVa79Axb7Rh")
     */
    static async playTrack(trackUri) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("playTrack: Cannot play - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uris: [trackUri]
                })
            });
            // 204 = success, 404 = no active device
            if (response.status === 204) {
                return true;
            }
            if (response.status === 404) {
                // No active device - try to get available devices and use the first one
                const devicesResponse = await fetch("https://api.spotify.com/v1/me/player/devices", {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                });
                if (devicesResponse.ok) {
                    const devicesData = await devicesResponse.json();
                    if (devicesData.devices.length > 0) {
                        const device = devicesData.devices.find(d => d.is_active) || devicesData.devices[0];
                        const retryResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.id}`, {
                            method: "PUT",
                            headers: {
                                "Authorization": `Bearer ${this.token}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                uris: [trackUri]
                            })
                        });
                        return retryResponse.status === 204;
                    }
                }
            }
            return false;
        }
        catch (error) {
            console.error("Failed to play track:", error);
            return false;
        }
    }
    /**
     * Search for a track by name and artist
     */
    static async searchTrack(name, artist) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("searchTrack: Cannot search - no valid token");
            return null;
        }
        try {
            const query = encodeURIComponent(`track:${name} artist:${artist}`);
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            if (data.tracks.items.length > 0) {
                return data.tracks.items[0].uri;
            }
            return null;
        }
        catch {
            return null;
        }
    }
    /**
     * Pause playback
     */
    static async pause() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("pause: Cannot pause - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Resume playback
     */
    static async resume() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("resume: Cannot resume - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Skip to next track
     */
    static async next() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("next: Cannot skip - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/next", {
                method: "POST",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Skip to previous track
     */
    static async previous() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("previous: Cannot go back - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/previous", {
                method: "POST",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Get current user profile
     */
    static async getUserProfile() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getUserProfile: Cannot get profile - no valid token");
            return null;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                name: data.display_name,
                id: data.id,
                image: data.images?.[0]?.url,
                followers: data.followers?.total,
                product: data.product,
                country: data.country
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Get user's playlists
     */
    static async getPlaylists() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getPlaylists: Cannot get playlists - no valid token");
            return null;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.items;
        }
        catch {
            return null;
        }
    }
    /**
     * Get tracks from a playlist
     */
    static async getPlaylistTracks(playlistId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getPlaylistTracks: Cannot get tracks - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.items
                .filter(item => item.track !== null)
                .map(item => ({
                name: item.track.name,
                artist: item.track.artists.map(a => a.name).join(", "),
                album: item.track.album.name,
                albumArt: item.track.album.images[0]?.url || "",
                duration: item.track.duration_ms,
                uri: item.track.uri
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get user's liked/saved songs
     */
    static async getLikedSongs() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getLikedSongs: Cannot get liked songs - no valid token");
            return null;
        }
        try {
            // First get total count
            const countResponse = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!countResponse.ok) {
                console.error("Failed to get liked songs count:", countResponse.status, await countResponse.text());
                return null;
            }
            const countData = await countResponse.json();
            // Then get tracks
            const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok) {
                console.error("Failed to get liked songs:", response.status);
                return null;
            }
            const data = await response.json();
            return {
                total: countData.total,
                tracks: data.items.map(item => ({
                    name: item.track.name,
                    artist: item.track.artists.map(a => a.name).join(", "),
                    album: item.track.album.name,
                    albumArt: item.track.album.images[0]?.url || "",
                    duration: item.track.duration_ms,
                    uri: item.track.uri
                }))
            };
        }
        catch (error) {
            console.error("Error fetching liked songs:", error);
            return null;
        }
    }
    /**
     * Seek to a position in the current track
     * @param positionMs - Position in milliseconds
     */
    static async seek(positionMs) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("seek: Cannot seek - no valid token");
            return false;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Set the volume for the user's current playback device
     * @param volumePercent - Volume level (0-100)
     */
    static async setVolume(volumePercent) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("setVolume: Cannot set volume - no valid token");
            return false;
        }
        // Clamp volume to valid range
        const volume = Math.max(0, Math.min(100, Math.round(volumePercent)));
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Get available playback devices
     */
    static async getDevices() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getDevices: Cannot get devices - no valid token");
            return null;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.devices.map(d => ({
                id: d.id,
                name: d.name,
                type: d.type,
                isActive: d.is_active,
                volumePercent: d.volume_percent
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Transfer playback to a different device
     * @param deviceId - The ID of the device to transfer to
     * @param play - Whether to start playing on the new device
     */
    static async transferPlayback(deviceId, play = true) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("transferPlayback: Cannot transfer - no valid token");
            return false;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    device_ids: [deviceId],
                    play: play
                })
            });
            return response.status === 204 || response.status === 200;
        }
        catch {
            return false;
        }
    }
    /**
     * Get recently played tracks
     * @param limit - Number of tracks to return (1-50, default 20)
     */
    static async getRecentlyPlayed(limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getRecentlyPlayed: Cannot get history - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.items.map(item => ({
                name: item.track.name,
                artist: item.track.artists.map(a => a.name).join(", "),
                album: item.track.album.name,
                albumArt: item.track.album.images[0]?.url || "",
                uri: item.track.uri,
                playedAt: item.played_at
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get audio features for a track (tempo, energy, danceability, etc.)
     * @param trackId - Spotify track ID
     */
    static async getAudioFeatures(trackId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getAudioFeatures: Cannot get features - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                tempo: data.tempo,
                energy: data.energy,
                danceability: data.danceability,
                valence: data.valence,
                acousticness: data.acousticness,
                instrumentalness: data.instrumentalness,
                loudness: data.loudness,
                key: data.key,
                mode: data.mode,
                timeSignature: data.time_signature
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Save a track to user's library (like/heart)
     * @param trackId - Spotify track ID
     */
    static async saveTrack(trackId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("saveTrack: Cannot save - no valid token");
            return false;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 200 || response.status === 201;
        }
        catch {
            return false;
        }
    }
    /**
     * Remove a track from user's library (unlike/unheart)
     * @param trackId - Spotify track ID
     */
    static async removeTrack(trackId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("removeTrack: Cannot remove - no valid token");
            return false;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            return response.status === 200 || response.status === 204;
        }
        catch {
            return false;
        }
    }
    /**
     * Check if a track is in user's library
     * @param trackId - Spotify track ID
     */
    static async isTrackSaved(trackId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("isTrackSaved: Cannot check - no valid token");
            return false;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return false;
            const data = await response.json();
            return data[0] === true;
        }
        catch {
            return false;
        }
    }
    /**
     * Search for tracks
     * @param query - Search query
     * @param limit - Number of results (1-50, default 20)
     */
    static async searchTracks(query, limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("searchTracks: Cannot search - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                duration: track.duration_ms,
                uri: track.uri,
                popularity: track.popularity
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Search for artists
     * @param query - Search query
     * @param limit - Number of results (1-50, default 20)
     */
    static async searchArtists(query, limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("searchArtists: Cannot search - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images[0]?.url || "",
                genres: artist.genres.slice(0, 3),
                followers: artist.followers.total,
                popularity: artist.popularity
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get artist details
     * @param artistId - Spotify artist ID
     */
    static async getArtist(artistId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getArtist: Cannot get artist - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                id: data.id,
                name: data.name,
                image: data.images[0]?.url || "",
                genres: data.genres,
                followers: data.followers.total,
                popularity: data.popularity
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Get artist's top tracks
     * @param artistId - Spotify artist ID
     */
    static async getArtistTopTracks(artistId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getArtistTopTracks: Cannot get tracks - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                duration: track.duration_ms,
                uri: track.uri,
                popularity: track.popularity
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get album details
     * @param albumId - Spotify album ID
     */
    static async getAlbum(albumId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getAlbum: Cannot get album - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                id: data.id,
                name: data.name,
                artist: data.artists.map(a => a.name).join(", "),
                image: data.images[0]?.url || "",
                releaseDate: data.release_date,
                totalTracks: data.total_tracks
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Get tracks from an album
     * @param albumId - Spotify album ID
     */
    static async getAlbumTracks(albumId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getAlbumTracks: Cannot get tracks - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                duration: track.duration_ms,
                uri: track.uri,
                trackNumber: track.track_number
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get track details
     * @param trackId - Spotify track ID
     */
    static async getTrack(trackId) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getTrack: Cannot get track - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                id: data.id,
                name: data.name,
                artist: data.artists.map(a => a.name).join(", "),
                album: data.album.name,
                albumArt: data.album.images[0]?.url || "",
                duration: data.duration_ms,
                uri: data.uri,
                popularity: data.popularity,
                previewUrl: data.preview_url
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Get recommendations based on seed tracks/artists
     * @param seedTracks - Array of track IDs
     * @param seedArtists - Array of artist IDs
     * @param limit - Number of results (1-100, default 20)
     */
    static async getRecommendations(seedTracks, seedArtists, limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getRecommendations: Cannot get recommendations - no valid token");
            return null;
        }
        const seeds = [];
        if (seedTracks?.length)
            seeds.push(...seedTracks.slice(0, 5).map(id => `seed_tracks=${id}`));
        if (seedArtists?.length)
            seeds.push(...seedArtists.slice(0, 5 - (seedTracks?.length || 0)).map(id => `seed_artists=${id}`));
        if (seeds.length === 0)
            return null;
        try {
            const response = await fetch(`https://api.spotify.com/v1/recommendations?${seeds.join("&")}&limit=${Math.min(100, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                uri: track.uri
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get available genre seeds
     */
    static async getAvailableGenres() {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getAvailableGenres: Cannot get genres - no valid token");
            return null;
        }
        try {
            const response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.genres;
        }
        catch {
            return null;
        }
    }
    /**
     * Get new album releases
     * @param limit - Number of results (1-50, default 20)
     */
    static async getNewReleases(limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getNewReleases: Cannot get releases - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.albums.items.map(album => ({
                id: album.id,
                name: album.name,
                artist: album.artists.map(a => a.name).join(", "),
                image: album.images[0]?.url || "",
                releaseDate: album.release_date
            }));
        }
        catch {
            return null;
        }
    }
    /**
     * Get featured playlists
     * @param limit - Number of results (1-50, default 20)
     */
    static async getFeaturedPlaylists(limit = 20) {
        if (!await this.ensureToken()) {
            Debug_1.Debug.write("getFeaturedPlaylists: Cannot get playlists - no valid token");
            return null;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            if (!response.ok)
                return null;
            const data = await response.json();
            return data.playlists.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
                image: playlist.images[0]?.url || "",
                owner: playlist.owner.display_name
            }));
        }
        catch {
            return null;
        }
    }
}
exports.SpotifyService = SpotifyService;
SpotifyService.token = "";
