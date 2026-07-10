import { BaseSource, SongLyrics } from "./BaseSource"
import { Settings } from "../Settings"
import { Debug } from "../Debug"

/**
 * Musixmatch unofficial API source.
 * Uses the same private endpoint that the Musixmatch web app uses.
 * Requires a musixmatchUserToken from the user's Musixmatch cookies — see README.
 * Provides LINE_SYNCED lyrics, same database that powers Spotify's built-in lyrics.
 */
export class MusixmatchSource extends BaseSource {
    private request(url: string): Promise<Response> {
        const token = Settings.credentials.musixmatchToken
        return fetch(url, {
            headers: {
                "authority": "apic-desktop.musixmatch.com",
                "cookie": `x-mxm-token-guid=${token}`
            }
        })
    }

    private async getSongId(name: string, artist: string): Promise<number> {
        const token = Settings.credentials.musixmatchToken
        if (!token) throw new Error("No Musixmatch token configured")

        const url = `https://apic-desktop.musixmatch.com/ws/1.1/track.search` +
            `?q_track=${encodeURIComponent(name)}&q_artist=${encodeURIComponent(artist)}` +
            `&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0` +
            `&app_id=web-desktop-app-v1.0&usertoken=${token}`

        const res = await this.request(url)
        if (!res.ok) throw new Error(`Musixmatch search HTTP ${res.status}`)

        const json: any = await res.json()
        const trackList = json?.message?.body?.track_list
        if (!trackList || trackList.length === 0) throw new Error("Musixmatch: song not found")

        const track = trackList[0]?.track
        if (!track?.track_id) throw new Error("Musixmatch: no track_id in result")

        Debug.write(`[MusixmatchSource] Found track: "${track.track_name}" id=${track.track_id}`)
        return track.track_id
    }

    public async getLyrics(name: string, artist: string): Promise<SongLyrics> {
        const token = Settings.credentials.musixmatchToken
        if (!token) throw new Error("No Musixmatch token configured")

        const trackId = await this.getSongId(name, artist)

        const url = `https://apic-desktop.musixmatch.com/ws/1.1/track.subtitle.get` +
            `?track_id=${trackId}&subtitle_format=lrc&app_id=web-desktop-app-v1.0&usertoken=${token}`

        const res = await this.request(url)
        if (!res.ok) throw new Error(`Musixmatch subtitle HTTP ${res.status}`)

        const json: any = await res.json()
        const subtitleBody = json?.message?.body?.subtitle?.subtitle_body
        if (!subtitleBody || !subtitleBody.trim()) throw new Error("Musixmatch: no synced lyrics")

        Debug.write(`[MusixmatchSource] Got synced lyrics for "${name}"`)
        return this.parseLyrics(subtitleBody)
    }

    private parseLyrics(lrc: string): SongLyrics {
        const result: SongLyrics = { lines: [] }

        for (const rawLine of lrc.split("\n")) {
            const line = rawLine.trim()
            if (!line) continue

            // Regex must be created per-line: the /g flag makes lastIndex stateful,
            // so reusing one instance across loop iterations skips timestamps after line 1.
            const regexp = /\[(\d\d):(\d\d)(?:\.(\d\d?\d?))?]/g
            const timestamps: number[] = []
            let match: RegExpExecArray | null
            while ((match = regexp.exec(line)) !== null) {
                const min = parseInt(match[1])
                const sec = parseInt(match[2])
                // match[3] may be 2 or 3 digits; normalise to ms
                const ms = match[3] ? parseInt(match[3].padEnd(3, "0")) : 0
                timestamps.push((min * 60 + sec) * 1000 + ms)
            }

            const text = line.replace(/\[\d\d:\d\d(?:\.\d+)?]/g, "").trim()
            if (!text) continue

            for (const time of timestamps.length ? timestamps : [0]) {
                result.lines.push({ time, text })
            }
        }

        result.lines.sort((a, b) => a.time - b.time)
        return result
    }

    public getAppName(): string {
        return "Musixmatch"
    }
}
