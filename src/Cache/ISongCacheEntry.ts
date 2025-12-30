import { ISongLyrics } from "../Lyrics/ISongLyrics"

export interface ISongCacheEntry {
    name: string
    artist: string

    lyrics: ISongLyrics | null
    lyricsPath: string | null

    _transformedFullName: string // Transformed to UUID song name + artist
}
