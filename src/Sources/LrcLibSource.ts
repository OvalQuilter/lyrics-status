import { BaseSource, LyricsWord, SongLyrics } from "./BaseSource"

interface LyricsResponse {
    id: number
    name: string
    trackName: string
    artistName: string
    albumName: string
    plainLyrics: string | null
    syncedLyrics: string | null
}

/**
 * Lyrics but using LrcLib
 * https://lrclib.net/api
 */
export class LrcLibSource extends BaseSource {
    private readonly baseUrl = "https://lrclib.net/api"

        public async getLyrics(name: string, artist: string): Promise<SongLyrics> {
            const response = await fetch(
                `${this.baseUrl}/get?track_name=${encodeURIComponent(name)}&artist_name=${encodeURIComponent(artist)}`
            )

            if (!response.ok) throw new Error(`Request failed: ${response.status}`)

                const json = (await response.json()) as LyricsResponse

                // Only if there are sync lyrics
                if (!json.syncedLyrics || !json.syncedLyrics.trim()) {
                    // Retrun nothing (this should switch to the next one right?)
                    throw new Error("No synced lyrics found")
                }

                return this.parseLyrics(json.syncedLyrics)
        }

        /**
         * Convert the response to the .json format we use
         */
    private parseLyrics(lyrics: string): SongLyrics {
        const result: SongLyrics = { lines: [] }
        const lines = lyrics.split("\n")

        // it should be: [mm:ss.xx] text
        const regexp = /\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?]/g
        const wordRegexp = /<(\d{2}):(\d{2})(?:\.(\d{1,3}))?>/g

        for (let line of lines) {
            if (!line.trim()) continue

                const timestamps: number[] = []
                let match: RegExpExecArray | null

                regexp.lastIndex = 0
                while ((match = regexp.exec(line)) !== null) {
                    const min = parseInt(match[1])
                    const sec = parseInt(match[2])
                    const msRaw = match[3] ? parseInt(match[3]) : 0
                    const ms = match[3]
                        ? (match[3].length === 3 ? msRaw : match[3].length === 2 ? msRaw * 10 : msRaw * 100)
                        : 0
                    timestamps.push((min * 60 + sec) * 1000 + ms)
                }

                const lineWithWordTags = line.replace(regexp, "").trim()
                const words = this.parseWordTimings(lineWithWordTags, wordRegexp)
                const text = lineWithWordTags.replace(wordRegexp, "").replace(/\s+/g, " ").trim()
                if (!text) continue

                    for (const time of timestamps.length ? timestamps : [0]) {
                        result.lines.push({ time, text, words })
                    }
        }

        result.lines.sort((a, b) => a.time - b.time)
        return result
    }

    private parseWordTimings(line: string, wordRegexp: RegExp): LyricsWord[] | undefined {
        wordRegexp.lastIndex = 0
        const matches = [...line.matchAll(wordRegexp)]
        if (!matches.length) return undefined

        const words: LyricsWord[] = []

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i]
            const min = parseInt(match[1])
            const sec = parseInt(match[2])
            const msRaw = match[3] ? parseInt(match[3]) : 0
            const ms = match[3]
                ? (match[3].length === 3 ? msRaw : match[3].length === 2 ? msRaw * 10 : msRaw * 100)
                : 0
            const startTime = (min * 60 + sec) * 1000 + ms

            const startIndex = (match.index ?? 0) + match[0].length
            const endIndex = i + 1 < matches.length ? (matches[i + 1].index ?? line.length) : line.length
            const wordText = line.slice(startIndex, endIndex).replace(wordRegexp, "").trim()

            if (wordText) {
                words.push({ startTime, text: wordText })
            }
        }

        return words.length ? words : undefined
    }

    public getAppName(): string {
        return "LrcLib"
    }
}
