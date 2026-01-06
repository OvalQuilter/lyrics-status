import { ISongLyrics } from "../Lyrics/ISongLyrics"
import { ISongLyricsPartial } from "../Lyrics/ISongLyricsPartial"

export interface ISongCacheEntry {
    name: string
    artist: string

    lyrics: ISongLyrics | ISongLyricsPartial | null
    lyricsPath: string | null

    _transformedFullSongName: string // Transformed to UUID song name + artist
}
