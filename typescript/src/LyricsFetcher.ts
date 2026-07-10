import { BaseSource, SongLyrics } from "./Sources/BaseSource"
import { LyricsLine } from "./Sources/BaseSource"
import { Settings } from "./Settings"
import { CacheStore, cacheKey } from "./CacheStore"

// opencc-js has "type":"module" so require() throws ERR_REQUIRE_ESM. Use dynamic import().
let _openccPromise: Promise<any> | null = null
let _toTraditional: ((s: string) => string) | null = null
let _toSimplified: ((s: string) => string) | null = null

function getOpencc(): Promise<any> {
    if (!_openccPromise) {
        _openccPromise = import("opencc-js").catch(e => {
            console.error("[LyricsFetcher] opencc-js failed to load:", e)
            return null
        })
    }
    return _openccPromise!
}

async function getConverter(mode: string): Promise<((s: string) => string) | null> {
    if (mode === "off") return null
    const opencc = await getOpencc()
    if (!opencc) return null
    try {
        if (mode === "toTraditional") {
            if (!_toTraditional) _toTraditional = opencc.Converter({ from: "cn", to: "tw" })
            return _toTraditional
        }
        if (mode === "toSimplified") {
            if (!_toSimplified) _toSimplified = opencc.Converter({ from: "tw", to: "cn" })
            return _toSimplified
        }
    } catch (e) {
        console.error("[LyricsFetcher] opencc-js Converter init failed:", e)
    }
    return null
}

async function applyConversion(lyrics: SongLyrics | null): Promise<SongLyrics | null> {
    const mode = Settings.chineseConversion || "off"
    if (mode === "off" || !lyrics || !Array.isArray((lyrics as any).lines)) return lyrics
    const convert = await getConverter(mode)
    if (!convert) return lyrics
    try {
        return { ...(lyrics as any), lines: (lyrics as any).lines.map((l: any) => ({ ...l, text: convert(l.text || "") })) }
    } catch (e) {
        console.error("[LyricsFetcher] Conversion error:", e)
        return lyrics
    }
}

export class LyricsFetcher {
    public sources: BaseSource[]
    private cache: CacheStore

    public lastFetchedFrom: string
    public lastFetchedFor: string

    private _inFlight = new Map<string, Promise<SongLyrics | null>>()

    constructor(cache: CacheStore) {
        this.sources = []
        this.cache = cache
        this.lastFetchedFrom = "Not fetched"
        this.lastFetchedFor = ""
    }

    public addSource(source: BaseSource): void {
        this.sources.push(source)
    }

    public async fetchLyrics(name: string, artist: string): Promise<SongLyrics | null> {
        if (!name || !artist) return null

        const key = cacheKey(name, artist)

        // In-flight check before cache — prevents double-fetch on concurrent polls
        if (this._inFlight.has(key)) return this._inFlight.get(key)!

        const cached = this.cache.get(name, artist)
        if (cached !== null) {
            this.lastFetchedFor = `${name}\0${artist}`
            if (!cached.lines) {
                this.lastFetchedFrom = "Cache (none)"
                return null
            }
            this.lastFetchedFrom = `Cache (${cached.appName})`
            return applyConversion({ lines: cached.lines })
        }

        const p = this._doFetch(name, artist)
        this._inFlight.set(key, p)
        p.finally(() => this._inFlight.delete(key))
        return p
    }

    private async _doFetch(name: string, artist: string): Promise<SongLyrics | null> {
        let result: SongLyrics | null = null
        let appName = "none"
        let hadNetworkError = false

        for (const source of this.sources) {
            try {
                const r = await source.getLyrics(name, artist)
                if (r?.lines?.length) {
                    result = r
                    appName = source.getAppName()
                    break
                }
            } catch {
                hadNetworkError = true
            }
        }

        const error = (!result && hadNetworkError) ? "network" : undefined
        this.cache.set(name, artist, result?.lines ?? null, appName, error)

        const maxRows = Settings.cache.maxRows
        if (maxRows > 0) this.cache.evict(maxRows)

        this.lastFetchedFrom = appName
        this.lastFetchedFor = `${name}\0${artist}`
        return result ? applyConversion(result) : null
    }
}
