import { PlaybackState } from "./PlaybackState"
import { LyricsFetcher } from "./LyricsFetcher"
import { SpotifyService } from "./SpotifyService"
import { Settings } from "./Settings"
import { ExternalAuthServerAPI } from "./ExternalAuthServerAPI"
import { Debug } from "./Debug"

interface PlaybackResponse {
    item: {
        name: string
        id: string
        uri: string  // Spotify track URI

        artists: {
            name: string
        }[]

        album: {
            images: {
                url: string
                height: number
                width: number
            }[]
        }

        duration_ms: number
    }

    progress_ms: number

    is_playing: boolean
}

export class PlaybackStateUpdater {
    public playbackState: PlaybackState
    public lyricsFetcher: LyricsFetcher
    
    // Rate limiting backoff state
    private rateLimitedUntil: number = 0

    constructor(playbackState: PlaybackState, lyricsFetcher: LyricsFetcher) {
        this.playbackState = playbackState
        this.lyricsFetcher = lyricsFetcher
    }

    public async update(): Promise<void> {
        // Skip if rate limited
        if (Date.now() < this.rateLimitedUntil) {
            return
        }
        
        const roundTripTimeStart = Date.now()
        
        // DIAGNOSTIC: Log token status
        console.log(`[DEBUG] PlaybackStateUpdater.update() called`)
        console.log(`[DEBUG] Token present: ${SpotifyService.token ? 'YES (' + SpotifyService.token.substring(0, 10) + '...)' : 'NO - EMPTY!'}`)
        
        try {
            const request = await fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + SpotifyService.token
                }
            })
            
            // DIAGNOSTIC: Log response status
            console.log(`[DEBUG] Spotify API response status: ${request.status}`)

            // Handle 204 No Content (no active device or nothing playing)
            if (request.status === 204) {
                Debug.write("PlaybackStateUpdater: No active playback (204)")
                this.playbackState.isPlaying = false
                this.playbackState.spotifyConnected = true // API works, just nothing playing
                return
            }

            // Handle 429 Rate Limit - CRITICAL FIX
            if (request.status === 429) {
                const retryAfter = request.headers.get('Retry-After')
                const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 5
                this.rateLimitedUntil = Date.now() + (waitSeconds * 1000)  // Set backoff
                Debug.write(`PlaybackStateUpdater: Rate limited (429), waiting ${waitSeconds}s`)
                console.log(`[DEBUG] Rate limited! Waiting ${waitSeconds} seconds before retry`)
                this.playbackState.spotifyConnected = true
                return
            }

            if (request.status === 401 || request.status === 400) {
                Debug.write(`Spotify API returned ${request.status}, attempting token refresh...`)
                
                if (Settings.credentials.useExternalAuthServer) {
                    SpotifyService.token = await ExternalAuthServerAPI.getToken() || ""
                    if (!SpotifyService.token) {
                        Debug.write("External auth server failed to provide token")
                        this.playbackState.spotifyConnected = false
                        return
                    }
                } else {
                    const refreshSuccess = await SpotifyService.refresh()
                    if (!refreshSuccess) {
                        Debug.write("Token refresh failed - Spotify disconnected")
                        this.playbackState.spotifyConnected = false
                        return
                    }
                }
                // Retry after refresh but wait to avoid loops
                await new Promise(resolve => setTimeout(resolve, 500))
                return this.update()
            }
            
            if (request.status === 200) {
                const text = await request.text()
                if (!text) {
                    Debug.write("PlaybackStateUpdater: Empty response body")
                    this.playbackState.isPlaying = false
                    return
                }

                const json = JSON.parse(text) as PlaybackResponse
                const playbackState = this.playbackState

                // Check if there's an active track
                if (!json.item) {
                    Debug.write("PlaybackStateUpdater: No active track (item is null)")
                    playbackState.isPlaying = false
                    return
                }

                playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart)
                playbackState.isPlaying = json.is_playing
                playbackState.spotifyConnected = true

                Debug.write(`PlaybackStateUpdater: ${json.item.name} - ${json.is_playing ? 'playing' : 'paused'}`)

                if (playbackState.songId !== json.item.id) {
                    playbackState.songName = json.item.name.replace(/ \(.+\)/, "")
                    playbackState.songAuthor = json.item.artists[0].name

                    playbackState.oldSongId = playbackState.songId
                    playbackState.songId = json.item.id
                    playbackState.songUri = json.item.uri  // Store the Spotify URI
                    
                    // Get album art (prefer 300x300 size, fallback to first available)
                    const images = json.item.album?.images || []
                    playbackState.albumArt = images.find(img => img.height === 300)?.url || images[0]?.url || ""

                    playbackState.songDuration = json.item.duration_ms

                    playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
                    playbackState.currentLine = null
                    playbackState.hasLyrics = !!(playbackState.lyrics && playbackState.lyrics.lines && playbackState.lyrics.lines.length > 0);
                }
                if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                    // If song switches, and we didn't get lyrics of previous song yet, wrong lyrics may set. Check for wrong lyrics and set correct lyrics
                    playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
                }
            }
        } catch (error) {
            Debug.write(`PlaybackStateUpdater: Error - ${(error as Error).message}`)
            this.playbackState.spotifyConnected = false
        }
    }
}
