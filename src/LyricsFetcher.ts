import { BaseSource, CachedSongLyrics, SongLyrics } from "./Sources/BaseSource"
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs"

// ─── LyricsFetcher ────────────────────────────────────────────────────────────

/**
 * Tries each registered {@link BaseSource} in order until one returns synced
 * lyrics. Results are cached to disk under `./cache/` to avoid redundant
 * network requests on repeated plays.
 */
export class LyricsFetcher {
    private readonly sources: BaseSource[] = []

    /** Human-readable name of the source that provided the last result. */
    public lastFetchedFrom = "Not fetched"
    /** `name + artist` key of the last fetch attempt (used to detect mid-fetch song switches). */
    public lastFetchedFor  = ""

    // ── Source registration ───────────────────────────────────────────────────

    public addSource(source: BaseSource): void {
        this.sources.push(source)
    }

    // ── Fetch ─────────────────────────────────────────────────────────────────

    /**
     * Returns synced lyrics for the given track, or `null` if no source has them.
     * Checks the disk cache first before hitting any network source.
     */
    public async fetchLyrics(name: string, artist: string): Promise<SongLyrics | null> {
        this.lastFetchedFrom = "Not fetched"
        this.lastFetchedFor  = name + artist

        const cached = this.readCache(name, artist)

        if (cached) {
            this.lastFetchedFrom = `Cache (${cached.appName})`
            return cached
        }

        for (const source of this.sources) {
            try {
                const lyrics = await source.getLyrics(name, artist)

                this.lastFetchedFrom = source.getAppName()
                this.writeCache(name, artist, lyrics, source.getAppName())

                return lyrics
            } catch {
                // Source failed — try the next one
            }
        }

        return null
    }

    // ── Cache ─────────────────────────────────────────────────────────────────

    private cachePath(name: string, artist: string): string {
        return `./cache/${name}-${artist}.json`
    }

    private readCache(name: string, artist: string): CachedSongLyrics | null {
        try {
            return JSON.parse(readFileSync(this.cachePath(name, artist), "utf-8")) as CachedSongLyrics
        } catch {
            return null
        }
    }

    private writeCache(name: string, artist: string, lyrics: SongLyrics, appName: string): void {
        if (!existsSync("./cache")) mkdirSync("./cache")

        writeFileSync(
            this.cachePath(name, artist),
            JSON.stringify({ ...lyrics, appName })
        )
    }
}
