import axios from "axios"
import { Logger } from "pino"
import { LogManager } from "../../Debug/LogManager"
import { SettingsManager } from "../../Settings/SettingsManager"
import { SpotifyAccessToken } from "../../SpotifyAccessToken"
import { ISongLyrics } from "../ISongLyrics"
import { BaseSource } from "./BaseSource"
import { PlaybackState } from "../../Playback/PlaybackState";

interface PlayerResponse {
    item: {
        id: number
    } | null
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
    public readonly sourceName: string = "Spotify"

    private _logger: Logger = LogManager.instance.getClassLogger("SpotifySource")

    public constructor(
        private _playbackState: PlaybackState
    ) { super() }

    public async request<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url, {
            headers: {
                "accept": "application/json",
                "accept-language": "ru",
                "app-platform": "WebPlayer",
                "authorization": "Bearer " + SpotifyAccessToken.token,
                "spotify-app-version": "1.2.40.176.g6d58cb73",
                "Cookie": SettingsManager.instance.data.credentials.cookies,
                "Referer": "https://open.spotify.com/",
            },
        })

        return response.data
    }

    public async getLyrics(name: string, artist: string): Promise<ISongLyrics | null> {
        const songId = this._playbackState.songId

        if (!songId) {
            return null
        }

        const json = await this.request<LyricsResponse>(
            `https://spclient.wg.spotify.com/color-lyrics/v2/track/${songId}?format=json&vocalRemoval=false&market=from_token`,
        )

        if (json.lyrics.showUpsell || json.lyrics.syncType === "UNSYNCED") {
            return null
        }

        return this.parseLyrics(json.lyrics.lines, songId.toString())
    }

    public parseLyrics(lines: LyricsResponse["lyrics"]["lines"], songId: string): ISongLyrics {
        const result: ISongLyrics = {
            lines: [],
            meta: {
                sourceName: this.sourceName,
                sourceSongId: songId,
            },
        }

        for (const line of lines) {
            result.lines.push({
                timestamp: +line.startTimeMs,
                text: line.words,
            })
        }

        return result
    }
}
