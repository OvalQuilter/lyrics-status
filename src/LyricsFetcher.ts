import { BaseSource, CachedSongLyrics, SongLyrics } from "./Sources/BaseSource"
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs"
import { Settings } from "./Settings"

let _opencc: any = null
let _toTraditional: ((s: string) => string) | null = null
let _toSimplified: ((s: string) => string) | null = null

function getConverter(mode: string): ((s: string) => string) | null {
    if (mode === "off") return null
    try {
        if (!_opencc) _opencc = require("opencc-js")
        if (mode === "toTraditional") {
            if (!_toTraditional) _toTraditional = _opencc.Converter({ from: "cn", to: "tw" })
            return _toTraditional
        }
        if (mode === "toSimplified") {
            if (!_toSimplified) _toSimplified = _opencc.Converter({ from: "tw", to: "cn" })
            return _toSimplified
        }
    } catch (e) {
        console.error("[LyricsFetcher] opencc-js not available:", e)
    }
    return null
}

function applyConversion(lyrics: SongLyrics | null): SongLyrics | null {
    const mode = Settings.chineseConversion || "off"
    if (mode === "off" || !lyrics || !Array.isArray((lyrics as any).lines)) return lyrics
    const convert = getConverter(mode)
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
        this.lastFetchedFor = name + artist

        const cache = this.fetchCachedLyrics(name, artist)

        let result = cache as SongLyrics

        for (const source of this.sources) {
            if (cache) {
                this.lastFetchedFrom = `Cache (${cache.appName})`
                result = applyConversion(cache) as SongLyrics
                break
            }

            try {
                result = await source.getLyrics(name, artist)
                this.lastFetchedFrom = source.getAppName()
            } catch {}

            if (result) result = applyConversion(result) as SongLyrics
            if (result) {
                try { this.cacheLyrics(name, artist, result, this.lastFetchedFrom) }
                catch (e) { console.error(`[LyricsFetcher] Cache write failed for "${name}":`, e) }
            }
            if (result) break
        }

        return result
    }

    public fetchCachedLyrics(name: string, artist: string): CachedSongLyrics | null {
        const path = `./cache/${name}-${artist}.json`

        let lyrics: CachedSongLyrics | null = null

        try {
            lyrics = JSON.parse(readFileSync(path).toString())
        } catch {}

        return lyrics
    }

    public cacheLyrics(name: string, artist: string, lyrics: SongLyrics, appName: string): void {
        if (!existsSync("./cache")) mkdirSync("./cache")

        writeFileSync(`./cache/${name}-${artist}.json`, JSON.stringify({
            ...lyrics,
            appName
        }))
    }
}
