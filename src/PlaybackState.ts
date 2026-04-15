import { LyricsLine, SongLyrics } from "./Sources/BaseSource"

export class PlaybackState {
    public songName: string
    public songAuthor: string

    public songId: string
    public oldSongId: string
    public songUri: string  // Spotify URI for playback
    public albumArt: string // Album cover image URL

    public songDuration: number
    public songProgress: number

    public lyrics: SongLyrics | null
    public currentLine: LyricsLine | null
    public hasLyrics: boolean

    public isPlaying: boolean
    public spotifyConnected: boolean  // Track connection state

    constructor() {
        this.songName = ""
        this.songAuthor = ""

        this.songId = ""
        this.oldSongId = ""
        this.songUri = ""
        this.albumArt = ""

        this.songDuration = 0
        this.songProgress = 0

        this.lyrics = null
        this.currentLine = null
        this.hasLyrics = false

        this.isPlaying = false
        this.spotifyConnected = true  // Assume connected until proven otherwise
    }

    get ended(): boolean {
        return this.songDuration < this.songProgress
    }
}
