import axios from "axios"
import { Logger } from "pino"
import { LogManager } from "../../Debug/LogManager"
import { ILyricsLine } from "../ILyricsLine"
import { ISongLyrics } from "../ISongLyrics"
import { BaseSource } from "./BaseSource"

function parseLrcTimestamp(ts: string): number {
    const match = /(\d+):(\d+)[.:](\d+)/.exec(ts)

    if (!match) {return 0}

    const min = parseInt(match[1], 10)
    const sec = parseInt(match[2], 10)

    let ms = parseInt(match[3], 10)

    if (match[3].length === 2) {ms *= 10}

    return min * 60000 + sec * 1000 + ms
}

export class LrcLibSource extends BaseSource {
    private _logger: Logger = LogManager.instance.getClassLogger("LrcLibSource")

    public async getLyrics(name: string, artist: string, album?: string | null): Promise<ISongLyrics | null> {
        const params = new URLSearchParams({
            track_name: name,
            artist_name: artist,
        })

        const apiUrl = `https://lrclib.net/api/search?${params.toString()}`

        const response = await axios.get(apiUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                Accept: "application/json",
            },
        })
        // TODO: Add types for API calls

        if (response.status !== 200) {
            this._logger.warn(
                { response },
                "Response status is not expected 200 when trying to fetch lyrics from LrcLib.",
            )

            return null
        }

        const data = response.data

        if (!Array.isArray(data) || data.length === 0) {
            return null
        }

        const bestResult = data.find((item) => {
            return item.syncedLyrics && item.syncedLyrics.trim().length > 0
        })

        if (!bestResult) {
            return null
        }

        const lines: ILyricsLine[] = []
        const syncedLrc = bestResult.syncedLyrics as string

        for (const line of syncedLrc.split("\n")) {
            const match = /^\[(\d+:\d+[.:]\d+)](.*)$/.exec(line)
            if (match) {
                const time = parseLrcTimestamp(match[1])
                const text = match[2].trim()
                if (text.length > 0) {
                    lines.push({
                        timestamp: time,
                        text,
                    })
                }
            }
        }

        return {
            lines,
            meta: {
                sourceName: this.getSourceName(),
            },
        }
    }

    public getSourceName(): string {
        return "LrcLib"
    }
}
