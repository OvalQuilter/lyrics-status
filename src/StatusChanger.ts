import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"

export class StatusChanger {
    public playbackState: PlaybackState

    constructor(playbackState: PlaybackState) {
        this.playbackState = playbackState
    }

    public changeStatusRequest(text: string, token: string, emoji: string): Promise<Response> {
        return fetch("https://discordapp.com/api/v8/users/@me/settings", {
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
    }

    public changeStatus(): void {
        const playbackState = this.playbackState

        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) return

        const lyrics = playbackState.lyrics

        if (!lyrics) return

        const lines = lyrics.lines
        const offset = Settings.timings.offset

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const nextLine = lines[i + 1]

            if (line.time < (playbackState.songProgress + offset)) {
                if (!line.text) continue
                if (nextLine && nextLine.time < (playbackState.songProgress + offset)) continue
                if (line === playbackState.currentLine) break

                playbackState.currentLine = line

                if (Settings.view.advanced.enabled) {
                    this.changeStatusRequest(this.parseStatusString(Settings.view.advanced.customStatus), Settings.token, Settings.view.advanced.customEmoji)
                } else {
                    this.changeStatusRequest(this.getStatusString(line), Settings.token, "🎶")
                }

                break
            }
        }
    }

    public formatSeconds(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0' ) + s;
    }

    public getStatusString(line: LyricsLine): string {
        return `${Settings.view.timestamp ? `[${this.formatSeconds(+(line.time / 1000).toFixed(0))}] ` : ""}${Settings.view.label ? "Song lyrics - " : ""}${line.text.replace("♪", "🎶")}`;
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
                .replace("{timestamp}", this.formatSeconds(+(this.playbackState.currentLine.time / 1000).toFixed()))
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
