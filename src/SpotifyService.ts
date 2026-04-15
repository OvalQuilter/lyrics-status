import { Settings } from "./Settings"
import { Debug } from "./Debug"

interface IAccessTokenResponse {
    access_token: string
    refresh_token: string
}

// Token expiration tracking
let tokenExpiresAt: number = 0

export class SpotifyService {
    public static token: string = ""

    public static async exchange(): Promise<void> {
        const request = await fetch("https://accounts.spotify.com/api/token", {
            "headers": {
                "Authorization": `Basic ${Buffer.from(`${Settings.credentials.clientID}:${Settings.credentials.clientSecret}`).toString('base64')}`,
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                client_id: Settings.credentials.clientID,
                grant_type: "authorization_code",
                code: Settings.credentials.code,
                redirect_uri: Settings.credentials.customRedirectUri
            }).toString(),
            "method": "POST"
        });

        if (!request.ok) {
            Debug.write(`Spotify exchange failed: ${request.status} ${request.statusText}`)
            return
        }

        const json = await request.json() as IAccessTokenResponse

        this.token = json.access_token
        tokenExpiresAt = Date.now() + 3500000 // ~58 minutes (tokens last 1 hour)
        
        // DIAGNOSTIC: Log token set
        console.log(`[DEBUG] Token exchanged, length: ${this.token.length}, first 10 chars: ${this.token.substring(0, 10)}...`)

        Settings.credentials.refreshToken = json.refresh_token
        Settings.save() // Persist refresh token immediately
        Debug.write("Spotify token exchanged successfully")
    }

    public static async refresh(retryCount: number = 0): Promise<boolean> {
        const maxRetries = 3
        const backoffMs = Math.pow(2, retryCount) * 1000 // Exponential backoff: 1s, 2s, 4s

        try {
            const request = await fetch("https://accounts.spotify.com/api/token", {
                "headers": {
                    "Authorization": `Basic ${Buffer.from(`${Settings.credentials.clientID}:${Settings.credentials.clientSecret}`).toString('base64')}`,
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: Settings.credentials.refreshToken,
                    redirect_uri: Settings.credentials.customRedirectUri
                }).toString(),
                "method": "POST"
            });

            if (!request.ok) {
                Debug.write(`Spotify refresh failed: ${request.status} ${request.statusText}`)
                
                // Retry with backoff for recoverable errors
                if (retryCount < maxRetries && (request.status >= 500 || request.status === 429)) {
                    Debug.write(`Retrying in ${backoffMs}ms (attempt ${retryCount + 1}/${maxRetries})`)
                    await new Promise(resolve => setTimeout(resolve, backoffMs))
                    return this.refresh(retryCount + 1)
                }
                return false
            }

            const json = await request.json() as IAccessTokenResponse

            this.token = json.access_token
            tokenExpiresAt = Date.now() + 3500000 // ~58 minutes
            
            // DIAGNOSTIC: Log token refresh
            console.log(`[DEBUG] Token refreshed, length: ${this.token.length}, first 10 chars: ${this.token.substring(0, 10)}...`)

            if (json.refresh_token) {
                Settings.credentials.refreshToken = json.refresh_token
                Settings.save() // Persist new refresh token
            }
            
            Debug.write("Spotify token refreshed successfully")
            return true
        } catch (error) {
            Debug.write(`Spotify refresh error: ${(error as Error).message}`)
            
            if (retryCount < maxRetries) {
                Debug.write(`Retrying in ${backoffMs}ms (attempt ${retryCount + 1}/${maxRetries})`)
                await new Promise(resolve => setTimeout(resolve, backoffMs))
                return this.refresh(retryCount + 1)
            }
            return false
        }
    }

    public static isTokenExpired(): boolean {
        return Date.now() >= tokenExpiresAt
    }

    /**
     * Ensure we have a valid token, refreshing if needed
     * @returns true if token is valid, false if refresh failed
     */
    private static async ensureToken(): Promise<boolean> {
        if (!this.token || this.isTokenExpired()) {
            const refreshed = await this.refresh()
            if (!refreshed) {
                Debug.write("ensureToken: Token refresh failed")
                return false
            }
        }
        return true
    }

    /**
     * Play a specific track on Spotify
     * @param trackUri - Spotify track URI (e.g., "spotify:track:4iV5W9uYEdYUVa79Axb7Rh")
     */
    public static async playTrack(trackUri: string): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("playTrack: Cannot play - no valid token")
            return false
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
            })

            // 204 = success, 404 = no active device
            if (response.status === 204) {
                return true
            }

            if (response.status === 404) {
                // No active device - try to get available devices and use the first one
                const devicesResponse = await fetch("https://api.spotify.com/v1/me/player/devices", {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })

                if (devicesResponse.ok) {
                    const devicesData = await devicesResponse.json() as { devices: Array<{ id: string; is_active: boolean }> }
                    
                    if (devicesData.devices.length > 0) {
                        const device = devicesData.devices.find(d => d.is_active) || devicesData.devices[0]
                        
                        const retryResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.id}`, {
                            method: "PUT",
                            headers: {
                                "Authorization": `Bearer ${this.token}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                uris: [trackUri]
                            })
                        })

                        return retryResponse.status === 204
                    }
                }
            }

            return false
        } catch (error) {
            console.error("Failed to play track:", error)
            return false
        }
    }

    /**
     * Search for a track by name and artist
     */
    public static async searchTrack(name: string, artist: string): Promise<string | null> {
        if (!await this.ensureToken()) {
            Debug.write("searchTrack: Cannot search - no valid token")
            return null
        }

        try {
            const query = encodeURIComponent(`track:${name} artist:${artist}`)
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            })

            if (!response.ok) return null

            const data = await response.json() as { tracks: { items: Array<{ uri: string }> } }
            
            if (data.tracks.items.length > 0) {
                return data.tracks.items[0].uri
            }

            return null
        } catch {
            return null
        }
    }

    /**
     * Pause playback
     */
    public static async pause(): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("pause: Cannot pause - no valid token")
            return false
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Resume playback
     */
    public static async resume(): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("resume: Cannot resume - no valid token")
            return false
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Skip to next track
     */
    public static async next(): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("next: Cannot skip - no valid token")
            return false
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/next", {
                method: "POST",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Skip to previous track
     */
    public static async previous(): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("previous: Cannot go back - no valid token")
            return false
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/previous", {
                method: "POST",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Get current user profile
     */
    public static async getUserProfile(): Promise<{ 
        name: string
        id: string
        image?: string
        followers?: number
        product?: string
        country?: string
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getUserProfile: Cannot get profile - no valid token")
            return null
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                display_name: string
                id: string
                images?: Array<{ url: string }>
                followers?: { total: number }
                product?: string
                country?: string
            }
            return { 
                name: data.display_name, 
                id: data.id,
                image: data.images?.[0]?.url,
                followers: data.followers?.total,
                product: data.product,
                country: data.country
            }
        } catch {
            return null
        }
    }

    /**
     * Get user's playlists
     */
    public static async getPlaylists(): Promise<Array<{
        id: string
        name: string
        images: Array<{ url: string }>
        tracks: { total: number }
        owner: { display_name: string }
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getPlaylists: Cannot get playlists - no valid token")
            return null
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                items: Array<{
                    id: string
                    name: string
                    images: Array<{ url: string }>
                    tracks: { total: number }
                    owner: { display_name: string }
                }>
            }
            return data.items
        } catch {
            return null
        }
    }

    /**
     * Get tracks from a playlist
     */
    public static async getPlaylistTracks(playlistId: string): Promise<Array<{
        name: string
        artist: string
        album: string
        albumArt: string
        duration: number
        uri: string
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getPlaylistTracks: Cannot get tracks - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                items: Array<{
                    track: {
                        name: string
                        artists: Array<{ name: string }>
                        album: { name: string; images: Array<{ url: string }> }
                        duration_ms: number
                        uri: string
                    } | null
                }>
            }
            
            return data.items
                .filter(item => item.track !== null)
                .map(item => ({
                    name: item.track!.name,
                    artist: item.track!.artists.map(a => a.name).join(", "),
                    album: item.track!.album.name,
                    albumArt: item.track!.album.images[0]?.url || "",
                    duration: item.track!.duration_ms,
                    uri: item.track!.uri
                }))
        } catch {
            return null
        }
    }

    /**
     * Get user's liked/saved songs
     */
    public static async getLikedSongs(): Promise<{
        total: number
        tracks: Array<{
            name: string
            artist: string
            album: string
            albumArt: string
            duration: number
            uri: string
        }>
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getLikedSongs: Cannot get liked songs - no valid token")
            return null
        }
        
        try {
            // First get total count
            const countResponse = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!countResponse.ok) {
                console.error("Failed to get liked songs count:", countResponse.status, await countResponse.text())
                return null
            }
            
            const countData = await countResponse.json() as { total: number }
            
            // Then get tracks
            const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) {
                console.error("Failed to get liked songs:", response.status)
                return null
            }
            
            const data = await response.json() as { 
                items: Array<{
                    track: {
                        name: string
                        artists: Array<{ name: string }>
                        album: { name: string; images: Array<{ url: string }> }
                        duration_ms: number
                        uri: string
                    }
                }>
            }
            
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
            }
        } catch (error) {
            console.error("Error fetching liked songs:", error)
            return null
        }
    }

    /**
     * Seek to a position in the current track
     * @param positionMs - Position in milliseconds
     */
    public static async seek(positionMs: number): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("seek: Cannot seek - no valid token")
            return false
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Set the volume for the user's current playback device
     * @param volumePercent - Volume level (0-100)
     */
    public static async setVolume(volumePercent: number): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("setVolume: Cannot set volume - no valid token")
            return false
        }
        
        // Clamp volume to valid range
        const volume = Math.max(0, Math.min(100, Math.round(volumePercent)))
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Get available playback devices
     */
    public static async getDevices(): Promise<Array<{
        id: string
        name: string
        type: string
        isActive: boolean
        volumePercent: number
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getDevices: Cannot get devices - no valid token")
            return null
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                devices: Array<{
                    id: string
                    name: string
                    type: string
                    is_active: boolean
                    volume_percent: number
                }>
            }
            
            return data.devices.map(d => ({
                id: d.id,
                name: d.name,
                type: d.type,
                isActive: d.is_active,
                volumePercent: d.volume_percent
            }))
        } catch {
            return null
        }
    }

    /**
     * Transfer playback to a different device
     * @param deviceId - The ID of the device to transfer to
     * @param play - Whether to start playing on the new device
     */
    public static async transferPlayback(deviceId: string, play: boolean = true): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("transferPlayback: Cannot transfer - no valid token")
            return false
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
            })
            return response.status === 204 || response.status === 200
        } catch {
            return false
        }
    }

    /**
     * Get recently played tracks
     * @param limit - Number of tracks to return (1-50, default 20)
     */
    public static async getRecentlyPlayed(limit: number = 20): Promise<Array<{
        name: string
        artist: string
        album: string
        albumArt: string
        uri: string
        playedAt: string
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getRecentlyPlayed: Cannot get history - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                items: Array<{
                    track: {
                        name: string
                        artists: Array<{ name: string }>
                        album: { name: string; images: Array<{ url: string }> }
                        uri: string
                    }
                    played_at: string
                }>
            }
            
            return data.items.map(item => ({
                name: item.track.name,
                artist: item.track.artists.map(a => a.name).join(", "),
                album: item.track.album.name,
                albumArt: item.track.album.images[0]?.url || "",
                uri: item.track.uri,
                playedAt: item.played_at
            }))
        } catch {
            return null
        }
    }

    /**
     * Get audio features for a track (tempo, energy, danceability, etc.)
     * @param trackId - Spotify track ID
     */
    public static async getAudioFeatures(trackId: string): Promise<{
        tempo: number
        energy: number
        danceability: number
        valence: number
        acousticness: number
        instrumentalness: number
        loudness: number
        key: number
        mode: number
        timeSignature: number
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getAudioFeatures: Cannot get features - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as {
                tempo: number
                energy: number
                danceability: number
                valence: number
                acousticness: number
                instrumentalness: number
                loudness: number
                key: number
                mode: number
                time_signature: number
            }
            
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
            }
        } catch {
            return null
        }
    }

    /**
     * Save a track to user's library (like/heart)
     * @param trackId - Spotify track ID
     */
    public static async saveTrack(trackId: string): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("saveTrack: Cannot save - no valid token")
            return false
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 200 || response.status === 201
        } catch {
            return false
        }
    }

    /**
     * Remove a track from user's library (unlike/unheart)
     * @param trackId - Spotify track ID
     */
    public static async removeTrack(trackId: string): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("removeTrack: Cannot remove - no valid token")
            return false
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            return response.status === 200 || response.status === 204
        } catch {
            return false
        }
    }

    /**
     * Check if a track is in user's library
     * @param trackId - Spotify track ID
     */
    public static async isTrackSaved(trackId: string): Promise<boolean> {
        if (!await this.ensureToken()) {
            Debug.write("isTrackSaved: Cannot check - no valid token")
            return false
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return false
            
            const data = await response.json() as boolean[]
            return data[0] === true
        } catch {
            return false
        }
    }

    /**
     * Search for tracks
     * @param query - Search query
     * @param limit - Number of results (1-50, default 20)
     */
    public static async searchTracks(query: string, limit: number = 20): Promise<Array<{
        id: string
        name: string
        artist: string
        album: string
        albumArt: string
        duration: number
        uri: string
        popularity: number
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("searchTracks: Cannot search - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                tracks: { 
                    items: Array<{
                        id: string
                        name: string
                        artists: Array<{ name: string }>
                        album: { name: string; images: Array<{ url: string }> }
                        duration_ms: number
                        uri: string
                        popularity: number
                    }>
                }
            }
            
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                duration: track.duration_ms,
                uri: track.uri,
                popularity: track.popularity
            }))
        } catch {
            return null
        }
    }

    /**
     * Search for artists
     * @param query - Search query
     * @param limit - Number of results (1-50, default 20)
     */
    public static async searchArtists(query: string, limit: number = 20): Promise<Array<{
        id: string
        name: string
        image: string
        genres: string[]
        followers: number
        popularity: number
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("searchArtists: Cannot search - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                artists: { 
                    items: Array<{
                        id: string
                        name: string
                        images: Array<{ url: string }>
                        genres: string[]
                        followers: { total: number }
                        popularity: number
                    }>
                }
            }
            
            return data.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images[0]?.url || "",
                genres: artist.genres.slice(0, 3),
                followers: artist.followers.total,
                popularity: artist.popularity
            }))
        } catch {
            return null
        }
    }

    /**
     * Get artist details
     * @param artistId - Spotify artist ID
     */
    public static async getArtist(artistId: string): Promise<{
        id: string
        name: string
        image: string
        genres: string[]
        followers: number
        popularity: number
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getArtist: Cannot get artist - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as {
                id: string
                name: string
                images: Array<{ url: string }>
                genres: string[]
                followers: { total: number }
                popularity: number
            }
            
            return {
                id: data.id,
                name: data.name,
                image: data.images[0]?.url || "",
                genres: data.genres,
                followers: data.followers.total,
                popularity: data.popularity
            }
        } catch {
            return null
        }
    }

    /**
     * Get artist's top tracks
     * @param artistId - Spotify artist ID
     */
    public static async getArtistTopTracks(artistId: string): Promise<Array<{
        id: string
        name: string
        artist: string
        album: string
        albumArt: string
        duration: number
        uri: string
        popularity: number
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getArtistTopTracks: Cannot get tracks - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                tracks: Array<{
                    id: string
                    name: string
                    artists: Array<{ name: string }>
                    album: { name: string; images: Array<{ url: string }> }
                    duration_ms: number
                    uri: string
                    popularity: number
                }>
            }
            
            return data.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                duration: track.duration_ms,
                uri: track.uri,
                popularity: track.popularity
            }))
        } catch {
            return null
        }
    }

    /**
     * Get album details
     * @param albumId - Spotify album ID
     */
    public static async getAlbum(albumId: string): Promise<{
        id: string
        name: string
        artist: string
        image: string
        releaseDate: string
        totalTracks: number
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getAlbum: Cannot get album - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as {
                id: string
                name: string
                artists: Array<{ name: string }>
                images: Array<{ url: string }>
                release_date: string
                total_tracks: number
            }
            
            return {
                id: data.id,
                name: data.name,
                artist: data.artists.map(a => a.name).join(", "),
                image: data.images[0]?.url || "",
                releaseDate: data.release_date,
                totalTracks: data.total_tracks
            }
        } catch {
            return null
        }
    }

    /**
     * Get tracks from an album
     * @param albumId - Spotify album ID
     */
    public static async getAlbumTracks(albumId: string): Promise<Array<{
        id: string
        name: string
        artist: string
        duration: number
        uri: string
        trackNumber: number
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getAlbumTracks: Cannot get tracks - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                items: Array<{
                    id: string
                    name: string
                    artists: Array<{ name: string }>
                    duration_ms: number
                    uri: string
                    track_number: number
                }>
            }
            
            return data.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                duration: track.duration_ms,
                uri: track.uri,
                trackNumber: track.track_number
            }))
        } catch {
            return null
        }
    }

    /**
     * Get track details
     * @param trackId - Spotify track ID
     */
    public static async getTrack(trackId: string): Promise<{
        id: string
        name: string
        artist: string
        album: string
        albumArt: string
        duration: number
        uri: string
        popularity: number
        previewUrl: string | null
    } | null> {
        if (!await this.ensureToken()) {
            Debug.write("getTrack: Cannot get track - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as {
                id: string
                name: string
                artists: Array<{ name: string }>
                album: { name: string; images: Array<{ url: string }> }
                duration_ms: number
                uri: string
                popularity: number
                preview_url: string | null
            }
            
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
            }
        } catch {
            return null
        }
    }

    /**
     * Get recommendations based on seed tracks/artists
     * @param seedTracks - Array of track IDs
     * @param seedArtists - Array of artist IDs
     * @param limit - Number of results (1-100, default 20)
     */
    public static async getRecommendations(
        seedTracks?: string[],
        seedArtists?: string[],
        limit: number = 20
    ): Promise<Array<{
        id: string
        name: string
        artist: string
        album: string
        albumArt: string
        uri: string
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getRecommendations: Cannot get recommendations - no valid token")
            return null
        }
        
        const seeds: string[] = []
        if (seedTracks?.length) seeds.push(...seedTracks.slice(0, 5).map(id => `seed_tracks=${id}`))
        if (seedArtists?.length) seeds.push(...seedArtists.slice(0, 5 - (seedTracks?.length || 0)).map(id => `seed_artists=${id}`))
        
        if (seeds.length === 0) return null
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/recommendations?${seeds.join("&")}&limit=${Math.min(100, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                tracks: Array<{
                    id: string
                    name: string
                    artists: Array<{ name: string }>
                    album: { name: string; images: Array<{ url: string }> }
                    uri: string
                }>
            }
            
            return data.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map(a => a.name).join(", "),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                uri: track.uri
            }))
        } catch {
            return null
        }
    }

    /**
     * Get available genre seeds
     */
    public static async getAvailableGenres(): Promise<string[] | null> {
        if (!await this.ensureToken()) {
            Debug.write("getAvailableGenres: Cannot get genres - no valid token")
            return null
        }
        
        try {
            const response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { genres: string[] }
            return data.genres
        } catch {
            return null
        }
    }

    /**
     * Get new album releases
     * @param limit - Number of results (1-50, default 20)
     */
    public static async getNewReleases(limit: number = 20): Promise<Array<{
        id: string
        name: string
        artist: string
        image: string
        releaseDate: string
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getNewReleases: Cannot get releases - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                albums: { 
                    items: Array<{
                        id: string
                        name: string
                        artists: Array<{ name: string }>
                        images: Array<{ url: string }>
                        release_date: string
                    }>
                }
            }
            
            return data.albums.items.map(album => ({
                id: album.id,
                name: album.name,
                artist: album.artists.map(a => a.name).join(", "),
                image: album.images[0]?.url || "",
                releaseDate: album.release_date
            }))
        } catch {
            return null
        }
    }

    /**
     * Get featured playlists
     * @param limit - Number of results (1-50, default 20)
     */
    public static async getFeaturedPlaylists(limit: number = 20): Promise<Array<{
        id: string
        name: string
        description: string
        image: string
        owner: string
    }> | null> {
        if (!await this.ensureToken()) {
            Debug.write("getFeaturedPlaylists: Cannot get playlists - no valid token")
            return null
        }
        
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=${Math.min(50, Math.max(1, limit))}`, {
                headers: { "Authorization": `Bearer ${this.token}` }
            })
            
            if (!response.ok) return null
            
            const data = await response.json() as { 
                playlists: { 
                    items: Array<{
                        id: string
                        name: string
                        description: string
                        images: Array<{ url: string }>
                        owner: { display_name: string }
                    }>
                }
            }
            
            return data.playlists.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
                image: playlist.images[0]?.url || "",
                owner: playlist.owner.display_name
            }))
        } catch {
            return null
        }
    }
}
