import { BaseSource, SongLyrics } from "./BaseSource"

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
            const regexp = /\[(\d\d):(\d\d)(?:\.(\d\d))?]/g

            for (let line of lines) {
                if (!line.trim()) continue

                    const timestamps: number[] = []
                    let match: RegExpExecArray | null

                    while ((match = regexp.exec(line)) !== null) {
                        const min = parseInt(match[1])
                        const sec = parseInt(match[2])
                        const ms = match[3] ? parseInt(match[3]) * 10 : 0
                        timestamps.push((min * 60 + sec) * 1000 + ms)
                    }

                    const text = line.replace(regexp, "").trim()
                    if (!text) continue

                        for (const time of timestamps.length ? timestamps : [0]) {
                            result.lines.push({ time, text })
                        }
            }

            result.lines.sort((a, b) => a.time - b.time)
            return result
        }

        public getAppName(): string {
            return "LrcLib"
        }
}
