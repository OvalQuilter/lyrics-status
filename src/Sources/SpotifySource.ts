import { BaseSource, LyricsWord, SongLyrics } from "./BaseSource"
import { Settings } from "../Settings"
import { SpotifyService } from "../SpotifyService"

interface PlayerResponse {
    item: {
        id: number
    }
}

interface LyricsResponse {
    lyrics: {
        showUpsell: boolean
        syncType: string
        lines: {
            startTimeMs: string
            words: string
            endTimeMs?: string
            syllables?: unknown
        }[]
    }
}

export class SpotifySource extends BaseSource {
    public request(url: string): Promise<Response> {
        return fetch(url, {
            "headers": {
                "accept": "application/json",
                "accept-language": "ru",
                "app-platform": "WebPlayer",
                "authorization": "Bearer " + SpotifyService.token,
                "spotify-app-version": "1.2.40.176.g6d58cb73",
                "Cookie": Settings.credentials.cookies
            },
            "referrer": "https://open.spotify.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
        })
    }

    public async getSongId(): Promise<number> {
        const request = await this.request("https://api.spotify.com/v1/me/player")
        const json = await request.json() as PlayerResponse

        return json.item.id
    }

    public async getLyrics(name: string, artist: string): Promise<SongLyrics> {
        const songId = await this.getSongId()

        const request = await this.request(
            `https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`
        )
        const json = await request.json() as LyricsResponse

        if (json.lyrics.showUpsell || json.lyrics.syncType === "UNSYNCED") throw "Lyrics not found"

        return this.parseLyrics(json.lyrics.lines)
    }

    public parseLyrics(lines: LyricsResponse["lyrics"]["lines"]): SongLyrics {
        const result: SongLyrics = {
            lines: []
        }

        for (const line of lines) {
            const lineStart = +line.startTimeMs
            const lineEnd = line.endTimeMs ? +line.endTimeMs : undefined
            const wordTimings = this.parseWordTimings(line, lineStart)

            result.lines.push({
                time: lineStart,
                text: line.words,
                endTime: Number.isFinite(lineEnd) ? lineEnd : undefined,
                words: wordTimings
            })
        }

        return result
    }

    private parseWordTimings(line: LyricsResponse["lyrics"]["lines"][number], lineStart: number): LyricsWord[] | undefined {
        const syllables = (line as { syllables?: unknown }).syllables
        if (!Array.isArray(syllables) || syllables.length === 0) return undefined

        const words: LyricsWord[] = []

        for (const syl of syllables as Array<Record<string, unknown>>) {
            if (typeof syl !== "object" || !syl) continue
            const textValue = syl["text"] ?? syl["word"]
            const rawText = typeof textValue === "string" ? textValue.trim() : (textValue != null ? String(textValue).trim() : "")
            if (!rawText) continue

            const startValue = syl["startTimeMs"] ?? syl["startTime"]
            const rawStart = typeof startValue === "number" || typeof startValue === "string" ? Number(startValue) : NaN
            if (!Number.isFinite(rawStart)) continue

            const endValue = syl["endTimeMs"] ?? syl["endTime"]
            const rawEnd = typeof endValue === "number" || typeof endValue === "string" ? Number(endValue) : NaN

            const startTime = (rawStart < lineStart - 1000 && lineStart > 0) ? (lineStart + rawStart) : rawStart
            const endTime = Number.isFinite(rawEnd)
                ? ((rawEnd < lineStart - 1000 && lineStart > 0) ? (lineStart + rawEnd) : rawEnd)
                : undefined

            words.push({ startTime, endTime, text: rawText })
        }

        return words.length ? words : undefined
    }

    public getAppName(): string {
        return "Spotify"
    }
}
