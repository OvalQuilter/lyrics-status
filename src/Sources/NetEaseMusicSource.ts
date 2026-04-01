import { BaseSource, SongLyrics } from "./BaseSource"

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
    public request(url: string): Promise<Response> {
        return fetch(url, {
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
            `https://music.163.com/api/search/get?s=${encodeURIComponent(`${name}-${artist}`)}&type=1&offset=0&sub=false&limit=5`)
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

        for (let line of lines) {
            if (!line) continue

            const timestamps: number[] = []

            for (let match = line.match(regexp); match; match = line.match(regexp)) {
                const m = +match[1]
                const s = +match[3]
                const ms = match[4] ? parseInt(String(match[4]).padEnd(3, "0")) : 0

                line = line.replace(regexp, "")

                timestamps.push((60 * m + s) * 1000 + ms)
            }

            // Strip Chinese metadata lines and section labels
            const isMetadata = /^\s*(作词|作曲|编曲|制作人|录音|混音|母带|出品|发行|OP|SP|制作)\s*[：:]/u.test(line)
            const isSection = /^\s*\[(verse|chorus|bridge|intro|outro|hook|pre-chorus|refrain|interlude|drop|build|break|skit|spoken|rap|instrumental|ad.?lib)\s*\d*\]\s*$/i.test(line)
            if (isMetadata || isSection) continue

            for (const timestamp of timestamps) {
                result.lines.push({
                    time: timestamp,
                    text: line
                })
            }
        }

        result.lines.sort((a, b) => a.time - b.time)

        return result
    }

    public getAppName(): string {
        return "NetEase Music"
    }
}
