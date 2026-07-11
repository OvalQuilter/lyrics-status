import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"
import { Autooffset } from "./Autooffset"
import { Debug } from "./Debug"

function cpLen(s: string): number { return [...s].length; }
function cpSlice(s: string, n: number): string { return [...s].slice(0, n).join(""); }

export class StatusChangerBase {
    public playbackState: PlaybackState
    public sentLines: LyricsLine[]
    public autooffset: Autooffset

    public _rateLimitedUntil: number = 0
    public _lastSentAt: number = 0
    public _lastSentText: string = ""

    constructor(playbackState: PlaybackState) {
        this.playbackState = playbackState
        this.sentLines = []
        this.autooffset = new Autooffset()
    }

    public changeStatusRequest(text: string, token: string, emoji: string): Promise<Response> {
        const now = Date.now()
        Debug.write(`[StatusChanger] Sending Discord status: "${text}" | emoji: ${emoji}`)

        const request = fetch("https://discordapp.com/api/v8/users/@me/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify({
                custom_status: {
                    text, emoji_id: null, emoji_name: emoji,
                    expires_at: new Date(Date.now() + 60000).toISOString()
                }
            })
        })

        request.then((res) => {
            const elapsed = Date.now() - now
            if (res.status === 429) {
                res.text().then((raw: string) => {
                    Debug.write(`[StatusChanger] Rate limited (HTTP 429) | body: ${raw}`)
                    let retryAfter = 30
                    try {
                        const body = JSON.parse(raw)
                        if (typeof body.retry_after === "number" && body.retry_after > 0) retryAfter = body.retry_after
                    } catch (e) {
                        Debug.write(`[StatusChanger] Failed to parse rate limit body, defaulting to ${retryAfter}s: ${e}`)
                    }
                    if (Settings.rateLimit.enableBackoff) {
                        this._rateLimitedUntil = Date.now() + (retryAfter * 1000)
                        Debug.write(`[StatusChanger] Backing off ${retryAfter}s`)
                    } else {
                        Debug.write(`[StatusChanger] Rate limit (backoff disabled): ${retryAfter}s suggested`)
                    }
                }).catch((e: any) => {
                    Debug.write(`[StatusChanger] Rate limited but failed to read response body: ${e}`)
                    if (Settings.rateLimit.enableBackoff) this._rateLimitedUntil = Date.now() + 30000
                })
            } else if (res.status === 200) {
                Debug.write(`[StatusChanger] OK (${elapsed}ms)`)
                this.autooffset.addValue(elapsed)
            } else {
                res.text().then(body => Debug.write(`[StatusChanger] Error HTTP ${res.status}: ${body}`)).catch(() => {})
            }
        }).catch((err) => {
            Debug.write(`[StatusChanger] Fetch error: ${err}`)
        })

        return request
    }

    public smartTruncate(text: string, limit: number = 128, lyricLines: string[] | null = null): string {
        if (!text) return ""
        if (cpLen(text) <= limit) return text
        if (lyricLines && lyricLines.length > 1) {
            const lines = lyricLines.slice()
            while (lines.length > 1) {
                lines.pop()
                const candidate = lines.join(" ")
                if (cpLen(candidate) <= limit) return candidate
            }
            text = lines[0] || ""
            if (cpLen(text) <= limit) return text
        }
        const words = text.split(" ")
        while (words.length > 1) {
            words.pop()
            const candidate = words.join(" ")
            if (cpLen(candidate) <= limit) return candidate + "..."
        }
        return cpSlice(text, limit - 3) + "..."
    }

    public buildMergedLines(lines: LyricsLine[], anchorIndex: number, mergeWindowMs: number): { mergedText: string, lyricLines: string[], mergedLines: LyricsLine[] } {
        const anchor = lines[anchorIndex]
        let lyricLines: string[] = [anchor.text || ""]
        let mergedLines: LyricsLine[] = [anchor]

        if (mergeWindowMs > 0) {
            for (let j = anchorIndex - 1; j >= 0; j--) {
                const gapFromAnchor = anchor.time - lines[j].time
                if (gapFromAnchor > mergeWindowMs) break
                if (!lines[j].text) continue
                if (this.sentLines.some(s => s.time === lines[j].time)) break
                lyricLines.unshift(lines[j].text)
                mergedLines.unshift(lines[j])
            }
        }

        return { mergedText: lyricLines.join(" "), lyricLines, mergedLines }
    }

    public applyTemplate(template: string, mergedText: string, line: LyricsLine, playbackState: PlaybackState): string {
        const name = playbackState.songName || ""
        const author = playbackState.songAuthor || ""
        return template
            .replace("{lyrics}", mergedText)
            .replace("{lyrics_upper}", mergedText.toUpperCase())
            .replace("{lyrics_lower}", mergedText.toLowerCase())
            .replace("{lyrics_letters_only}", mergedText.replace(/['",\.]/gi, ""))
            .replace("{lyrics_upper_letters_only}", mergedText.toUpperCase().replace(/['",\.]/gi, ""))
            .replace("{lyrics_lower_letters_only}", mergedText.toLowerCase().replace(/['",\.]/gi, ""))
            .replace("♪", "🎶")
            .replace("{timestamp}", this.formatSeconds(+(line.time / 1000).toFixed()))
            .replace("{song_name}", name)
            .replace("{song_name_upper}", name.toUpperCase())
            .replace("{song_name_lower}", name.toLowerCase())
            .replace("{song_name_cropped}", name.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_upper_cropped}", name.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_lower_cropped}", name.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_author}", author)
            .replace("{song_author_upper}", author.toUpperCase())
            .replace("{song_author_lower}", author.toLowerCase())
    }

    public formatSeconds(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }
}
