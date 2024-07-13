import { LyricsLine, SongLyrics } from "./Sources/BaseSource"

export class PlaybackState {
    public songName: string
    public songAuthor: string

    public songId: string
    public oldSongId: string

    public songDuration: number
    public songProgress: number

    public lyrics: SongLyrics | null
    public currentLine: LyricsLine | null
    public hasLyrics: boolean

    public isPlaying: boolean

    constructor() {
        this.songName = ""
        this.songAuthor = ""

        this.songId = ""
        this.oldSongId = ""

        this.songDuration = 0
        this.songProgress = 0

        this.lyrics = null
        this.currentLine = null
        this.hasLyrics = false

        this.isPlaying = false
    }

    get ended(): boolean {
        return this.songDuration < this.songProgress
    }
}
