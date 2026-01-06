import axios from "axios"
import { decode } from "he"
import { Logger } from "pino"
import { LogManager } from "../../Debug/LogManager"
import { ISongLyrics } from "../ISongLyrics"
import { BaseSource } from "./BaseSource"

interface SearchResponse {
    count: number
    data: {
        song: {
            itemlist: {
                mid: string
            }[]
        }
    }
}

interface LyricsResponse {
    lyric: string
}

export class QQMusicSource extends BaseSource {
    public readonly sourceName: string = "QQMusic"


    public async request<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url, {
            headers: {
                "Referer": "https://y.qq.com/portal/player.html",
            },
        })

        return response.data
    }

    public async getSongId(name: string, artist: string): Promise<string | null> {
        const json = await this.request<SearchResponse>(
            `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?inCharset=utf-8&outCharset=utf-8&key=${encodeURIComponent(`${name} - ${artist}`)}`,
        )

        if (json.count <= 0) {
            return null
        }

        return json.data.song.itemlist[0].mid
    }

    public async getLyrics(name: string, artist: string): Promise<ISongLyrics | null> {
        const songId = await this.getSongId(name, artist)

        if (!songId) {
            return null
        }

        const json = await this.request<LyricsResponse>(
            `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&format=json&inCharset=utf-8&outCharset=utf-8&songmid=${songId}`,
        )

        if (!json.lyric) {
            return null
        }

        return this._parseLyrics(json.lyric, songId)
    }

    private _parseLyrics(lyrics: string, songId: string): ISongLyrics {
        const lines = Buffer.from(lyrics, "base64").toString("utf-8").split("\n")

        const result: ISongLyrics = {
            lines: [],
            meta: {
                sourceName: this.getSourceName(),
                sourceSongId: songId,
            },
        }

        const regexp = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/

        for (const line of lines) {
            if (!line) {
                continue
            }

            const match = regexp.exec(line)

            if (!(match && match[1] && match[3] && match[4])) {
                continue
            }

            const m = +match[1]
            const s = +match[3]
            const ms = +match[4]

            const text = line.replace(regexp, "")

            result.lines.push({
                timestamp: (60 * m + s) * 1000 + ms,
                text: decode(text),
            })
        }

        return result
    }

    public getSourceName(): string {
        return "QQMusic"
    }
}
