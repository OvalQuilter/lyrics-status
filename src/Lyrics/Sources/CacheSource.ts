import { SongCacheManager } from "../../Cache/SongCacheManager"
import { ISongLyrics } from "../ISongLyrics"
import { ISongLyricsPartial } from "../ISongLyricsPartial"
import { BaseSource } from "./BaseSource"

export class CacheSource extends BaseSource {
    public readonly sourceName: string = "Cache"

    public constructor(
        public songCacheManager: SongCacheManager,
    ) { super() }

    public async getLyrics(name: string, artist: string): Promise<ISongLyrics | ISongLyricsPartial | null> {
        const entry = await this.songCacheManager.fetchCachedSong(name, artist)

        if (!entry?.lyrics) {
            return null
        }

        return entry.lyrics
    }
}
