export interface LyricsWord {
    startTime: number
    endTime?: number
    text: string
}

export interface LyricsLine {
    time: number
    text: string
    endTime?: number
    words?: LyricsWord[]
}

export interface SongLyrics {
    lines: LyricsLine[]
}

export interface CachedSongLyrics extends SongLyrics {
    appName: string
}

export abstract class BaseSource {
    public abstract getLyrics(name: string, artist: string): Promise<SongLyrics>

    public abstract getAppName(): string
}
