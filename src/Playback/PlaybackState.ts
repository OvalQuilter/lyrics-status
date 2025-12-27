import { ILyricsLine } from "../Lyrics/ILyricsLine"
import { ISongLyrics } from "../Lyrics/ISongLyrics"
import { IPlaybackStateMetadata } from "./IPlaybackStateMetadata"

export class PlaybackState {
    public songName = ""
    public songArtist = ""
    public songAlbum = ""

    public songId = ""
    public oldSongId = ""

    public songDuration = 0
    public songProgress = 0

    public lyrics: ISongLyrics | null = null
    public currentLine: ILyricsLine | null = null
    public hasLyrics = false

    public isPlaying = false

    public meta: IPlaybackStateMetadata = {
        serviceName: "",
        serviceSongId: "",
    }

    public get ended(): boolean {
        return this.songDuration < this.songProgress
    }

    public clone(): PlaybackState {
        return Object.assign(new PlaybackState(), this)
    }
}
