import { PlaybackState } from "./PlaybackState"
import { LyricsFetcher } from "./LyricsFetcher"
import { Settings } from "./Settings"

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpotifyPlayerResponse {
    is_playing: boolean
    progress_ms: number
    item: SpotifyTrack | null
}

interface SpotifyTrack {
    id: string
    name: string
    duration_ms: number
    artists: { name: string }[]
}

interface DiscordConnection {
    type: string
    access_token?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DISCORD_API  = "https://discord.com/api/v10"
const SPOTIFY_API  = "https://api.spotify.com/v1"

/** Strip featured artist / remix suffixes like "(feat. X)" or "(Remix)" */
const TITLE_CLEANUP_RE = / \(.+\)/g

// ─── PlaybackStateUpdater ─────────────────────────────────────────────────────

/**
 * Polls the Spotify player API every few seconds and keeps {@link PlaybackState}
 * up to date.
 *
 * Authentication is handled transparently: the Spotify access token is read
 * from Discord's `/users/@me/connections` endpoint, which Discord refreshes
 * automatically. No OAuth setup or Spotify developer account is required.
 */
export class PlaybackStateUpdater {
    public readonly playbackState: PlaybackState
    public readonly lyricsFetcher: LyricsFetcher

    /** Spotify access token sourced from Discord connections. */
    private spotifyToken = ""

    constructor(playbackState: PlaybackState, lyricsFetcher: LyricsFetcher) {
        this.playbackState = playbackState
        this.lyricsFetcher = lyricsFetcher
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Fetches a fresh Spotify access token from Discord's connections endpoint.
     * Returns `true` on success, `false` if the Discord token is invalid or
     * the user has no Spotify account connected.
     */
    private async refreshSpotifyToken(): Promise<boolean> {
        try {
            const res = await fetch(`${DISCORD_API}/users/@me/connections`, {
                headers: { Authorization: Settings.credentials.token },
            })

            if (!res.ok) return false

            const connections = (await res.json()) as DiscordConnection[]
            const spotify = connections.find((c) => c.type === "spotify")

            if (!spotify?.access_token) return false

            this.spotifyToken = spotify.access_token
            return true
        } catch {
            return false
        }
    }

    /**
     * Calls the Spotify player endpoint. Automatically refreshes the token
     * once on a 401 and retries before giving up.
     */
    private async fetchPlayerState(): Promise<Response | null> {
        const headers = () => ({ Authorization: `Bearer ${this.spotifyToken}` })

        let res = await fetch(`${SPOTIFY_API}/me/player`, { headers: headers() })

        if (res.status === 401) {
            const refreshed = await this.refreshSpotifyToken()
            if (!refreshed) return null
            res = await fetch(`${SPOTIFY_API}/me/player`, { headers: headers() })
        }

        return res
    }

    /**
     * Fetches lyrics for the current song if they haven't been fetched yet,
     * or if a rapid song switch interrupted a previous fetch.
     */
    private async syncLyrics(): Promise<void> {
        const { playbackState, lyricsFetcher } = this
        const key = playbackState.songName + playbackState.songAuthor

        if (lyricsFetcher.lastFetchedFor === key) return

        playbackState.lyrics    = await lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
        playbackState.hasLyrics = !!playbackState.lyrics
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Polls the Spotify API and updates {@link PlaybackState}.
     * Call this on a regular interval (e.g. every 2 s).
     */
    public async update(): Promise<void> {
        if (!this.spotifyToken) {
            const ok = await this.refreshSpotifyToken()
            if (!ok) return
        }

        const requestStart = Date.now()
        const res = await this.fetchPlayerState()

        if (!res) return

        const { playbackState } = this

        // 204 = player is inactive (nothing queued / no active device)
        if (res.status === 204 || !res.ok) {
            playbackState.isPlaying = false
            return
        }

        const data = (await res.json()) as SpotifyPlayerResponse

        if (!data.item) {
            playbackState.isPlaying = false
            return
        }

        // Compensate for network round-trip so progress stays accurate
        playbackState.isPlaying    = data.is_playing
        playbackState.songProgress = data.progress_ms + (Date.now() - requestStart)
        playbackState.songDuration = data.item.duration_ms

        // Detect song change
        if (playbackState.songId !== data.item.id) {
            playbackState.oldSongId   = playbackState.songId
            playbackState.songId      = data.item.id
            playbackState.songName    = data.item.name.replace(TITLE_CLEANUP_RE, "")
            playbackState.songAuthor  = data.item.artists[0].name
            playbackState.lyrics      = null
            playbackState.currentLine = null
            playbackState.hasLyrics   = false
        }

        await this.syncLyrics()
    }
}
