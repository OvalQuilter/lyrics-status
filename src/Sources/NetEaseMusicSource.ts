import { BaseSource, SongLyrics } from "./BaseSource"
import { decode } from "he"

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
    public async request(url: string): Promise<Response> {
        return await fetch(url, {
            method: "POST",
            headers: {
                "Referer": "https://music.163.com",
                "Cookie": "appver=2.0.2",
                "X-Real-IP": "202.96.0.0"
            }
        })
    }

    public async getSongId(name: string, artist: string): Promise<number> {
        const request = await this.request(
            `https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5
            `)
        const json = await request.json() as SearchResponse

        if (json.result.songCount <= 0) throw "Song not found"

        return json.result.songs[0].id
    }

    public async getLyrics(name: string, artist: string): Promise<SongLyrics> {
        const songId = await this.getSongId(name, artist)

        const request = await this.request(`https://music.163.com/api/song/lyric?tv=-1&kv=-1&lv=-1&os=pc&id=${songId}`)
        const json = await request.json() as LyricsResponse

        if (!json.lrc || !json.lrc.lyric) throw "Lyrics not found"

        return this.parseLyrics(json.lrc.lyric)
    }

    public parseLyrics(lyrics: string): SongLyrics {
        const lines = lyrics.split("\n")
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
        return "NetEase Music"
    }
}
