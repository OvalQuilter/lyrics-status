import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"
import { Autooffset } from "./Autooffset"

// ─── Constants ────────────────────────────────────────────────────────────────

const DISCORD_STATUS_API = "https://discordapp.com/api/v8/users/@me/settings"
const MAX_STATUS_LENGTH  = 128
/** Status expires after 60 s so it auto-clears if the app stops. */
const STATUS_TTL_MS      = 60_000

// ─── StatusChanger ────────────────────────────────────────────────────────────

/**
 * Watches {@link PlaybackState} and sends Discord custom status updates
 * in sync with the current lyrics line.
 */
export class StatusChanger {
    public readonly playbackState: PlaybackState
    public readonly autooffset: Autooffset

    /** Lines already sent in the current song — prevents duplicate requests. */
    private sentLines: LyricsLine[] = []

    constructor(playbackState: PlaybackState) {
        this.playbackState = playbackState
        this.autooffset    = new Autooffset()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /** Sends a PATCH request to update the Discord custom status. */
    private sendStatusRequest(text: string, emoji: string): void {
        const sentAt = Date.now()

        fetch(DISCORD_STATUS_API, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization:  Settings.credentials.token,
            },
            body: JSON.stringify({
                custom_status: {
                    text,
                    emoji_id:   null,
                    emoji_name: emoji || null,
                    expires_at: new Date(sentAt + STATUS_TTL_MS).toISOString(),
                },
            }),
        }).then(() => this.autooffset.addValue(Date.now() - sentAt))
    }

    /**
     * Builds the status text for a lyrics line using the simple format
     * (timestamp + label + lyrics text).
     */
    private buildSimpleStatus(line: LyricsLine): string {
        const timestamp = this.formatSeconds(+(line.time / 1000).toFixed(0))
        const parts: string[] = []

        if (Settings.view.timestamp) parts.push(`[${timestamp}]`)
        if (Settings.view.label)     parts.push("Song lyrics -")

        parts.push(line.text.replace("♪", "🎶"))

        return parts.join(" ").slice(0, MAX_STATUS_LENGTH)
    }

    /**
     * Interpolates all `{placeholder}` tokens in the advanced custom status
     * template for the current playback state.
     */
    private buildAdvancedStatus(template: string): string {
        const line       = this.playbackState.currentLine
        const songName   = this.playbackState.songName
        const songAuthor = this.playbackState.songAuthor

        if (!line) return template.slice(0, MAX_STATUS_LENGTH)

        const timestamp  = this.formatSeconds(+(line.time / 1000).toFixed(0))
        const cropped    = (s: string) => s.replace(/( ?- ?.+)|(\(.+\))/gi, "")
        const lettersOnly = (s: string) => s.replace(/['",\.]/gi, "")

        return template
            .replace("{lyrics}",                    line.text)
            .replace("{lyrics_upper}",              line.text.toUpperCase())
            .replace("{lyrics_lower}",              line.text.toLowerCase())
            .replace("{lyrics_letters_only}",       lettersOnly(line.text))
            .replace("{lyrics_upper_letters_only}", lettersOnly(line.text.toUpperCase()))
            .replace("{lyrics_lower_letters_only}", lettersOnly(line.text.toLowerCase()))
            .replace("♪",                           "🎶")
            .replace("{timestamp}",                 timestamp)
            .replace("{song_name}",                 songName)
            .replace("{song_name_upper}",           songName.toUpperCase())
            .replace("{song_name_lower}",           songName.toLowerCase())
            .replace("{song_name_cropped}",         cropped(songName))
            .replace("{song_name_upper_cropped}",   cropped(songName.toUpperCase()))
            .replace("{song_name_lower_cropped}",   cropped(songName.toLowerCase()))
            .replace("{song_author}",               songAuthor)
            .replace("{song_author_upper}",         songAuthor.toUpperCase())
            .replace("{song_author_lower}",         songAuthor.toLowerCase())
            .slice(0, MAX_STATUS_LENGTH)
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Should be called on every frame (~60 fps). Checks whether the playback
     * position has crossed a new lyrics line and fires a status update if so.
     */
    public changeStatus(): void {
        this.autooffset.setLimit(Settings.timings.autooffset)

        const { playbackState } = this

        if (!playbackState.isPlaying || !playbackState.hasLyrics || playbackState.ended) return

        const lyrics = playbackState.lyrics
        if (!lyrics) return

        const offset = Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : Settings.timings.sendTimeOffset

        const threshold = playbackState.songProgress + offset

        for (let i = 0; i < lyrics.lines.length; i++) {
            const line     = lyrics.lines[i]
            const nextLine = lyrics.lines[i + 1]

            if (line.time >= threshold) continue
            if (!line.text) continue
            // Wait until this is the last line that has passed the threshold
            if (nextLine && nextLine.time < threshold) continue
            // Skip if already sent or already the current line
            if (this.sentLines.some((s) => s.time === line.time)) break
            if (line === playbackState.currentLine) break

            playbackState.currentLine = line
            this.sentLines.push(line)

            if (Settings.view.advanced.enabled) {
                this.sendStatusRequest(
                    this.buildAdvancedStatus(Settings.view.advanced.customStatus),
                    Settings.view.advanced.customEmoji
                )
            } else {
                this.sendStatusRequest(
                    this.buildSimpleStatus(line),
                    Settings.view.advanced.customEmoji
                )
            }

            break
        }
    }

    /** Call when the song changes to reset the sent-lines tracker. */
    public songChanged(): void {
        this.sentLines = []
    }

    /** Formats a total-seconds value as `m:ss`. */
    public formatSeconds(totalSeconds: number): string {
        const m = Math.floor(totalSeconds / 60)
        const s = totalSeconds % 60
        return `${m}:${s < 10 ? "0" : ""}${s}`
    }
}
