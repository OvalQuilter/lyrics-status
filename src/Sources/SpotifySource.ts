import { BaseSource, SongLyrics } from "./BaseSource"
import { SpotifyAccessToken } from "../SpotifyAccessToken"
import { Settings } from "../Settings"

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
                "authorization": "Bearer " + SpotifyAccessToken.token,
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
            result.lines.push({
                time: +line.startTimeMs,
                text: line.words
            })
        }

        return result
    }

    public getAppName(): string {
        return "Spotify"
    }
}
