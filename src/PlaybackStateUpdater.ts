import { PlaybackState } from "./PlaybackState"
import { LyricsFetcher } from "./LyricsFetcher"
import { SpotifyAccessToken } from "./SpotifyAccessToken"

interface PlaybackResponse {
    item: {
        name: string
        id: string

        artists: {
            name: string
        }[]

        duration_ms: number
    }

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
        const request = await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + SpotifyAccessToken.token
            }
        })

        if (request.status === 401) return await SpotifyAccessToken.refresh()
        if (request.status === 200) {
            const json = await request.json() as PlaybackResponse
            const playbackState = this.playbackState

            playbackState.songProgress = json.progress_ms + (Date.now() - roundTripTimeStart)
            playbackState.isPlaying = json.is_playing

            if (playbackState.songId !== (json.item && json.item.id)) {
                playbackState.songName = json.item.name.replace(/ \(.+\)/, "")
                playbackState.songAuthor = json.item.artists[0].name

                playbackState.oldSongId = playbackState.songId
                playbackState.songId = json.item.id

                playbackState.songDuration = json.item.duration_ms

                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
                playbackState.currentLine = null
                playbackState.hasLyrics = !!playbackState.lyrics;
            }
            if (this.lyricsFetcher.lastFetchedFor !== (playbackState.songName + playbackState.songAuthor)) {
                // If song switches, and we didn't get lyrics of previous song yet, wrong lyrics may set. Check for wrong lyrics and set correct lyrics
                playbackState.lyrics = await this.lyricsFetcher.fetchLyrics(playbackState.songName, playbackState.songAuthor)
            }
        }
    }
}
