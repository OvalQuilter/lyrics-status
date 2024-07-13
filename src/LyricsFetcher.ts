import { BaseSource, SongLyrics } from "./Sources/BaseSource"
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs"

export class LyricsFetcher {
    public sources: BaseSource[]

    public lastFetchedFrom: string
    public lastFetchedFor: string

    constructor() {
        this.sources = []

        this.lastFetchedFrom = "Not fetched"
        this.lastFetchedFor = ""
    }

    public addSource(source: BaseSource): void {
        this.sources.push(source)
    }

    public async fetchLyrics(name: string, artist: string): Promise<SongLyrics | null> {
        this.lastFetchedFrom = "Not fetched"

        const cache = this.fetchCachedLyrics(name, artist)

        let result = cache

        for (const source of this.sources) {
            if (cache) {
                this.lastFetchedFrom = "Cache"

                break
            }

            try {
                this.lastFetchedFor = name + artist

                result = await source.getLyrics(name, artist)

                this.lastFetchedFrom = source.getAppName()

                this.cacheLyrics(name, artist, result)
            } catch {}

            if (result) break
        }

        return result
    }

    public fetchCachedLyrics(name: string, artist: string): SongLyrics | null {
        const path = `./cache/${name}-${artist}.json`

        let lyrics: SongLyrics | null = null

        try {
            lyrics = JSON.parse(readFileSync(path).toString())
        } catch {}

        return lyrics
    }

    public cacheLyrics(name: string, artist: string, lyrics: SongLyrics): void {
        if (!existsSync("./cache")) mkdirSync("./cache")

        writeFileSync(`./cache/${name}-${artist}.json`, JSON.stringify(lyrics))
    }
}
