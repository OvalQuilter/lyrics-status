import { BaseSource, SongLyrics } from "./BaseSource"
import { decode } from "he"

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
    public async request(url: string): Promise<Response> {
        return fetch(url, {
            headers: {
                "Referer": "http://y.qq.com/portal/player.html"
            }
        })
    }

    public async getSongId(name: string, artist: string): Promise<string> {
        const request = await this.request(
            `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?inCharset=utf-8&outCharset=utf-8&key=${encodeURIComponent(`${name}-${artist}`)}`
        )
        const json = await request.json() as SearchResponse

        if (json.count <= 0) throw "Song not found"

        return json.data.song.itemlist[0].mid
    }

    public async getLyrics(name: string, artist: string): Promise<SongLyrics> {
        const songId = await this.getSongId(name, artist)

        const request = await this.request(
            `http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&format=json&inCharset=utf-8&outCharset=utf-8&songmid=${songId}`
        )
        const json = await request.json() as LyricsResponse

        if (!json.lyric) throw "Lyrics not found"

        return this.parseLyrics(json.lyric)
    }

    public parseLyrics(lyrics: string): SongLyrics {
        const lines = Buffer.from(lyrics, "base64").toString("utf-8").split("\n")

        const result: SongLyrics = {
            lines: []
        }

        const regexp = /\[(\d\d):((\d\d)\.(\d\d?\d?))]/

        for (const line of lines) {
            if (!line) continue

            const match = line.match(regexp)

            if (!(match && match[1] && match[3] && match[4])) continue

            const m = +match[1]
            const s = +match[3]
            const ms = +match[4]

            const text = line.replace(regexp, "")

            result.lines.push({
                time: (60 * m + s) * 1000 + ms,
                text: decode(text)
            })
        }

        return result
    }

    public getAppName(): string {
        return "QQMusic"
    }
}
