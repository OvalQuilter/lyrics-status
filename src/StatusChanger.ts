import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"
import { Autooffset } from "./Autooffset"
import { Debug } from "./Debug"

// Count by Unicode code points, not UTF-16 code units.
// Emoji use surrogate pairs and have .length === 2 but are 1 code point.
// Discord's 128-char status limit is by code point, so we must count the same way.
function cpLen(s: string): number { return [...s].length; }
function cpSlice(s: string, n: number): string { return [...s].slice(0, n).join(""); }

export class StatusChanger {
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
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                custom_status: {
                    text,
                    emoji_id: null,
                    emoji_name: emoji,
                    expires_at: new Date(Date.now() + 60000).toISOString()
                }
            })
        })

        request.then((res) => {
            const elapsed = Date.now() - now
            if (res.status === 429) {
                res.text().then((raw: string) => {
                    Debug.write(\[StatusChanger] Rate limited (HTTP 429) | body: \\)
                    let retryAfter = 30
                    try {
                        const body = JSON.parse(raw)
                        if (typeof body.retry_after === "number" && body.retry_after > 0) retryAfter = body.retry_after
                    } catch (e) {
                        Debug.write(\[StatusChanger] Failed to parse rate limit body, defaulting to \s: \\)
                    }
                    if (Settings.rateLimit.enableBackoff) {
                        this._rateLimitedUntil = Date.now() + (retryAfter * 1000)
                        Debug.write(\[StatusChanger] Backing off \s\)
                    } else {
                        Debug.write(\[StatusChanger] Rate limit (backoff disabled): \s suggested\)
                    }
                }).catch((e: any) => {
                    Debug.write(\[StatusChanger] Rate limited but failed to read response body: \\)
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

    // Collects the anchor line and any unsent lines within mergeWindowMs BEHIND it.
    // Lines are returned in chronological order (oldest first) so the merged text
    // reads naturally and the truncation reduction loop drops the newest lines first.
    //
    // Why backward? The skip logic in changeStatus() always positions i at the LAST
    // due line (where nextLine is not yet due). Looking forward from there finds
    // nothing — all future lines are not yet due. Looking backward collects the
    // recent past within the configurable window, which is exactly what merging means.
    public buildMergedLines(lines: LyricsLine[], anchorIndex: number, mergeWindowMs: number): { mergedText: string, lyricLines: string[], mergedLines: LyricsLine[] } {
        const anchor = lines[anchorIndex]
        let lyricLines: string[] = [anchor.text || ""]
        let mergedLines: LyricsLine[] = [anchor]

        if (mergeWindowMs > 0) {
            for (let j = anchorIndex - 1; j >= 0; j--) {
                const gapFromAnchor = anchor.time - lines[j].time
                if (gapFromAnchor > mergeWindowMs) break
                if (!lines[j].text) continue
                // Skip lines already sent in a previous interval
                if (this.sentLines.some(s => s.time === lines[j].time)) continue
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

    public changeStatus(): void {
        this.autooffset.setLimit(Settings.timings.autooffset)

        const playbackState = this.playbackState
        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) return

        const lyrics = playbackState.lyrics
        if (!lyrics) return

        const now = Date.now()
        if (Settings.rateLimit.enableBackoff && now < this._rateLimitedUntil) return

        const minInterval = Settings.rateLimit.enableMinInterval
            ? (Settings.rateLimit.minIntervalMs || 5000) : 0
        if (minInterval > 0 && now - this._lastSentAt < minInterval) return

        const currentLine = playbackState.currentLine
        const songProgress = playbackState.songProgress
        const lines = lyrics.lines
        const offset = Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : Settings.timings.sendTimeOffset

        // Pre-compute mergeWindowMs once per call — used by both skip check and buildMergedLines
        const mergeWindowMs = Settings.rateLimit.enableMergeLines
            ? (Settings.rateLimit.mergeWindowMs || 8000) : 0

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const nextLine = lines[i + 1]

            if (line.time < (songProgress + offset)) {
                if (!line.text) continue

                // Skip stale lines — if the next line is also already due, this one
                // is not the anchor. Keep scanning forward to the last due line.
                // buildMergedLines then collects recent unsent lines BEHIND that anchor.
                if (nextLine && nextLine.time < (songProgress + offset)) continue

                // Anchor found (last due line). Stop if already sent or already current.
                if (this.sentLines.some((sentLine) => sentLine.time === line.time)) break
                if (line === currentLine) break

                const { mergedText, lyricLines, mergedLines } = this.buildMergedLines(lines, i, mergeWindowMs)
                playbackState.currentLine = line
                this._lastSentAt = now

                let statusText!: string
                let emoji!: string

                if (Settings.view.advanced.enabled) {
                    const template = Settings.view.advanced.customStatus
                    const fullStatus = this.applyTemplate(template, mergedText, line, playbackState)
                    if (cpLen(fullStatus) <= 128) {
                        statusText = fullStatus
                    } else {
                        const reducedLines = lyricLines.slice()
                        let fitted = false
                        while (reducedLines.length > 1) {
                            reducedLines.pop()
                            const candidate = this.applyTemplate(template, reducedLines.join(" "), line, playbackState)
                            if (cpLen(candidate) <= 128) { statusText = candidate; fitted = true; break }
                        }
                        if (!fitted) {
                            statusText = this.smartTruncate(
                                this.applyTemplate(template, lyricLines[0], line, playbackState),
                                128, null
                            )
                        }
                    }
                    emoji = Settings.view.advanced.customEmoji
                } else {
                    const prefix = `${Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings.view.label ? "Song lyrics - " : ""}`
                    const cleanedLines = lyricLines.map(l => l.replace("♪", "🎶"))
                    const limit = 128 - cpLen(prefix)
                    const reduced = cleanedLines.slice()
                    while (reduced.length > 1 && cpLen(reduced.join(" ")) > limit) reduced.pop()
                    const lyricsText = cpLen(reduced.join(" ")) <= limit
                        ? reduced.join(" ")
                        : this.smartTruncate(reduced[0], limit, null)
                    statusText = prefix + lyricsText
                    emoji = "🎶"
                }

                if (statusText === this._lastSentText) {
                    for (const ml of mergedLines) this.sentLines.push(ml)
                    break
                }
                this._lastSentText = statusText
                Debug.write(`[StatusChanger] Queuing status (${mergedLines.length} line(s) merged): "${statusText}"`)
                this.changeStatusRequest(statusText, Settings.credentials.token, emoji)

                for (const ml of mergedLines) this.sentLines.push(ml)
                break
            }
        }
    }

    public songChanged(): void {
        this.sentLines = []
        this._lastSentAt = Date.now()
    }

    public formatSeconds(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }

    public parseStatusString(status: string): string {
        if (!this.playbackState.currentLine) return this.smartTruncate(status || "", 128, null)
        const line = this.playbackState.currentLine
        const name = this.playbackState.songName || ""
        const author = this.playbackState.songAuthor || ""
        status = (status || "")
            .replace("{lyrics}", line.text || "")
            .replace("{lyrics_upper}", (line.text || "").toUpperCase())
            .replace("{lyrics_lower}", (line.text || "").toLowerCase())
            .replace("{lyrics_letters_only}", (line.text || "").replace(/['",\.]/gi, ""))
            .replace("{lyrics_upper_letters_only}", (line.text || "").toUpperCase().replace(/['",\.]/gi, ""))
            .replace("{lyrics_lower_letters_only}", (line.text || "").toLowerCase().replace(/['",\.]/gi, ""))
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
        return this.smartTruncate(status, 128, null)
    }
}
