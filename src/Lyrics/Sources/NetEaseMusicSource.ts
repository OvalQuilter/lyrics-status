import axios from "axios"
import { Logger } from "pino"
import { LogManager } from "../../Debug/LogManager"
import { ISongLyrics } from "../ISongLyrics"
import { BaseSource } from "./BaseSource"

interface SearchResponse {
    result: {
        songs: {
            id: number
        }[]
        songCount: number
    }
}

interface LyricsResponse {
    lrc: {
        lyric: string
    } | undefined
}

export class NetEaseMusicSource extends BaseSource {
    public readonly sourceName: string = "NetEase Music"

    private _logger: Logger = LogManager.instance.getClassLogger("NetEaseMusicSource")

    public async request<T>(url: string): Promise<T> {
        const response = await axios.post<T>(url, null, {
            headers: {
                "Referer": "https://music.163.com",
                "Cookie": "appver=2.0.2",
                "X-Real-IP": "202.96.0.0",
            },
        })

        return response.data
    }

    public async getSongId(name: string, artist: string): Promise<number | null> {
        const json = await this.request<SearchResponse>(
            `https://music.163.com/api/search/get?s=${encodeURIComponent(`${name} - ${artist}`)}&type=1&offset=0&sub=false&limit=5`,
        )

        if (json.result.songCount <= 0) {
            return null
        }

        return json.result.songs[0].id
    }

    public async getLyrics(name: string, artist: string): Promise<ISongLyrics | null> {
        const songId = await this.getSongId(name, artist)

        if (!songId) {
            return null
        }

        const json = await this.request<LyricsResponse>(
            `https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${songId}`,
        )

        if (!json.lrc?.lyric) {
            return null
        }

        return this._parseLyrics(json.lrc.lyric, songId.toString())
    }

    private _parseLyrics(lyrics: string, songId: string): ISongLyrics {
        const lines = lyrics.split("\n")
        const result: ISongLyrics = {
            lines: [],
            meta: {
                sourceName: this.sourceName,
                sourceSongId: songId,
            },
        }

        const regexp = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/

        for (let line of lines) {
            if (!line) {
                continue
            }

            const timestamps: number[] = []

            for (let match = regexp.exec(line); match; match = regexp.exec(line)) {
                const minutes = +match[1]
                const seconds = +match[3]
                const milliseconds = +match[4]

                line = line.replace(regexp, "")

                timestamps.push((60 * minutes + seconds) * 1000 + milliseconds)
            }

            for (const timestamp of timestamps) {
                result.lines.push({
                    timestamp: timestamp,
                    text: line,
                })
            }
        }

        result.lines.sort((a, b) => {
            return a.timestamp - b.timestamp
        })

        return result
    }
}
