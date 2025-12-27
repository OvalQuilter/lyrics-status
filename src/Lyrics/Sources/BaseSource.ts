import { ISongLyrics } from "../ISongLyrics"
import { ISongLyricsPartial } from "../ISongLyricsPartial"

export abstract class BaseSource {
    public abstract getLyrics(name: string, artist: string): Promise<ISongLyrics | ISongLyricsPartial | null>
    // Only return null when lyrics are not found, an error occurred, etc.

    public abstract getSourceName(): string
}
