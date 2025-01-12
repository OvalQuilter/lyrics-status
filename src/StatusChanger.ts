import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"
import { Autooffset } from "./Autooffset"

export class StatusChanger {
    public playbackState: PlaybackState

    public sentLines: LyricsLine[]

    public autooffset: Autooffset

    constructor(playbackState: PlaybackState) {
        this.playbackState = playbackState

        this.sentLines = []

        this.autooffset = new Autooffset()
    }

    public changeStatusRequest(text: string, token: string, emoji: string): Promise<Response> {
        const now = Date.now()

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

        request.then(() => this.autooffset.addValue(Date.now() - now))

        return request
    }

    public changeStatus(): void {
        this.autooffset.setLimit(Settings.timings.autooffset)

        const playbackState = this.playbackState

        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) return

        const lyrics = playbackState.lyrics

        if (!lyrics) return

        const currentLine = playbackState.currentLine
        const songProgress = playbackState.songProgress
        const lines = lyrics.lines
        const offset = Settings.timings.enableAutooffset ? this.autooffset.getAverageValue() + 100 : Settings.timings.sendTimeOffset

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const nextLine = lines[i + 1]

            if (line.time < (songProgress + offset)) {
                if (!line.text) continue
                if (nextLine && nextLine.time < (songProgress + offset)) continue
                if (this.sentLines.some((sentLine) => sentLine.time === line.time)) break
                if (line === currentLine) break

                playbackState.currentLine = line

                if (Settings.view.advanced.enabled) {
                    this.changeStatusRequest(this.parseStatusString(Settings.view.advanced.customStatus), Settings.credentials.token, Settings.view.advanced.customEmoji)
                } else {
                    this.changeStatusRequest(this.getStatusString(line), Settings.credentials.token, "🎶")
                }

                this.sentLines.push(line)

                break
            }
        }
    }

    public songChanged(): void {
        this.sentLines = []
    }

    public formatSeconds(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0' ) + s
    }

    public getStatusString(line: LyricsLine): string {
        return `${Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings.view.label ? "Song lyrics - " : ""}${line.text.replace("♪", "🎶")}`.slice(0, 128)
    }

    public parseStatusString(status: string): string {
        if(this.playbackState.currentLine) {
            const line = this.playbackState.currentLine
            const songName = this.playbackState.songName
            const songAuthor = this.playbackState.songAuthor

            status = status
                .replace("{lyrics}", line.text)
                .replace("{lyrics_upper}", line.text.toUpperCase())
                .replace("{lyrics_lower}", line.text.toLowerCase())
                .replace("{lyrics_letters_only}", line.text.replace(/['",\.]/gi, ""))
                .replace("{lyrics_upper_letters_only}", line.text.toUpperCase().replace(/['",\.]/gi, ""))
                .replace("{lyrics_lower_letters_only}", line.text.toLowerCase().replace(/['",\.]/gi, ""))
                .replace("♪", "🎶")
                .replace("{timestamp}", this.formatSeconds(+(line.time / 1000).toFixed()))
                .replace("{song_name}", songName)
                .replace("{song_name_upper}", songName.toUpperCase())
                .replace("{song_name_lower}", songName.toLowerCase())
                .replace("{song_name_cropped}", songName.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_upper_cropped}", songName.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_lower_cropped}", songName.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_author}", songAuthor)
                .replace("{song_author_upper}", songAuthor.toUpperCase())
                .replace("{song_author_lower}", songAuthor.toLowerCase());
        }

        return status.slice(0, 128);
    }
}
