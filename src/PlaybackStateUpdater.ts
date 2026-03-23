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
        artists: { name: string }[]
        duration_ms: number
    } | null

    progress_ms: number
    is_playing: boolean
}

export class PlaybackStateUpdater {
    public playbackState: PlaybackState
    public lyricsFetcher: LyricsFetcher

    constructor(playbackState: PlaybackState, lyricsFetcher: LyricsFetcher) {
        this.playbackState = playbackState
        this.lyricsFetcher = lyricsFetcher
    }

    public async update(): Promise<void> {
        const roundTripTimeStart = Date.now()

        Debug.write(`[PlaybackStateUpdater] Polling Spotify API...`)

        const request = await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + SpotifyService.token
            }
        })

        Debug.write(`[PlaybackStateUpdater] Spotify API response: HTTP ${request.status}`)

        if (request.status === 401 || request.status === 400) {
            Debug.write(`[PlaybackStateUpdater] Auth error (${request.status}) - refreshing token`)
            if (Settings.credentials.useExternalAuthServer) {
                SpotifyService.token = await ExternalAuthServerAPI.getToken() || ""
                Debug.write(`[PlaybackStateUpdater] Got new token from external auth server: ${!!SpotifyService.token}`)
            } else {
                Debug.write(`[PlaybackStateUpdater] Calling SpotifyService.refresh()`)
                return await SpotifyService.refresh()
            }
        }

        if (request.status === 200) {
            const json = await request.json() as PlaybackResponse
            const playbackState = this.playbackState

            // FIX: guard against null item (e.g. podcast, local file, or nothing playing)
            if (!json.item) {
                Debug.write(`[PlaybackStateUpdater] json.item is null — skipping song update`)
                playbackState.isPlaying = json.is_playing ?? false
                return
            }

            playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart)
            playbackState.isPlaying = json.is_playing

            Debug.write(`[PlaybackStateUpdater] isPlaying:${json.is_playing} | song: "${json.item.name}" | progress: ${json.progress_ms}ms`)

            if (playbackState.songId !== json.item.id) {
                Debug.write(`[PlaybackStateUpdater] New song detected: "${json.item.name}" by ${json.item.artists?.[0]?.name ?? "Unknown"}`)

                playbackState.songName = json.item.name.replace(/ \(.+\)/, "")
                // FIX: safe access on artists array
                playbackState.songAuthor = json.item.artists?.[0]?.name ?? "Unknown"

                playbackState.oldSongId = playbackState.songId
                playbackState.songId = json.item.id
                playbackState.songDuration = json.item.duration_ms

                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
                playbackState.currentLine = null
                playbackState.hasLyrics = !!playbackState.lyrics

                Debug.write(`[PlaybackStateUpdater] Lyrics fetched: ${playbackState.hasLyrics} | source: ${this.lyricsFetcher.lastFetchedFrom}`)
            }

            // If lyrics haven't been fetched for the current song yet, retry
            if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
                playbackState.hasLyrics = !!playbackState.lyrics
            }
        }

        if (request.status === 204) {
            Debug.write(`[PlaybackStateUpdater] Spotify returned 204 - nothing playing`)
        }
    }
}
