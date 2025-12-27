import axios, { AxiosResponse } from "axios"
import { Logger } from "pino"
import { LogManager } from "../Debug/LogManager"
import { ILyricsLine } from "../Lyrics/ILyricsLine"
import { PlaybackManager } from "../Playback/PlaybackManager"
import { SettingsManager } from "../Settings/SettingsManager"
import { Autooffset } from "./Autooffset"

export class StatusManager {
    private _logger: Logger = LogManager.instance.getClassLogger("StatusManager")

    private _autooffset: Autooffset = new Autooffset()

    public constructor(
        private _playbackManager: PlaybackManager,
    ) {}

    public async changeStatusRequest(text: string, token: string, emoji: string): Promise<AxiosResponse> {
        const now = Date.now()

        const request = await axios.patch("https://discord.com/api/v10/users/@me/settings", JSON.stringify({
            custom_status: {
                text,
                emoji_id: null,
                emoji_name: emoji,
                expires_at: new Date(Date.now() + 60000).toISOString(),
            },
        }), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        })

        this._autooffset.addValue(Date.now() - now)

        return request
    }

    public iterateLyrics(): void {
        this._autooffset.setLimit(SettingsManager.instance.data.timings.autooffset)

        const playbackState = this._playbackManager.state

        if (playbackState.ended || !playbackState.hasLyrics || !playbackState.isPlaying) {
            return
        }

        const lyrics = playbackState.lyrics

        if (!lyrics) {
            return
        }

        const lines = lyrics.lines
        const currentLine = playbackState.currentLine

        const songProgress = playbackState.songProgress

        const offset =
            SettingsManager.instance.data.timings.enableAutooffset ?
                this._autooffset.getAverageValue() + 100 :
                SettingsManager.instance.data.timings.sendTimeOffset

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const nextLine = lines[i + 1]

            if (line.timestamp < (songProgress + offset)) {
                const isCurrentLine = line === currentLine
                const isCurrentLineSkipped = nextLine && (songProgress + offset) > nextLine.timestamp
                const isAlreadyFurther = currentLine && currentLine.timestamp > songProgress

                if (
                    isCurrentLine ||
                    !line.text ||
                    isCurrentLineSkipped ||
                    isAlreadyFurther
                ) {
                    continue
                }

                playbackState.currentLine = line

                void this.changeStatusRequest(
                    this._parseStatusString(SettingsManager.instance.data.view.advanced.customStatus),
                    SettingsManager.instance.data.credentials.token,
                    SettingsManager.instance.data.view.advanced.customEmoji
                )

                break
            }
        }
    }

    private _formatSeconds(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0" ) + s
    }

    private _getStatusString(line: ILyricsLine): string {
        const timestamp =
            SettingsManager.instance.data.view.timestamp ?
                `[${this._formatSeconds(+(line.timestamp / 1000).toFixed(0))}] ` :
                ""
        const label = SettingsManager.instance.data.view.label ? "Song lyrics - " : ""

        return `${timestamp}${label}${line.text.replace("♪", "🎶")}`.slice(0, 128)
    }

    private _parseStatusString(status: string): string {
        const playbackState = this._playbackManager.state

        if(playbackState.currentLine) {
            const line = playbackState.currentLine
            const songName = playbackState.songName
            const songArtist = playbackState.songArtist

            status = status
                .replace("{lyrics}", line.text)
                .replace("{lyrics_upper}", line.text.toUpperCase())
                .replace("{lyrics_lower}", line.text.toLowerCase())
                .replace("{lyrics_letters_only}", line.text.replace(/['",.]/gi, ""))
                .replace("{lyrics_upper_letters_only}", line.text.toUpperCase().replace(/['",.]/gi, ""))
                .replace("{lyrics_lower_letters_only}", line.text.toLowerCase().replace(/['",.]/gi, ""))
                .replace("♪", "🎶")
                .replace("{timestamp}", this._formatSeconds(+(line.timestamp / 1000).toFixed()))
                .replace("{song_name}", songName)
                .replace("{song_name_upper}", songName.toUpperCase())
                .replace("{song_name_lower}", songName.toLowerCase())
                .replace("{song_name_cropped}", songName.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_upper_cropped}", songName.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_name_lower_cropped}", songName.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
                .replace("{song_artist}", songArtist)
                .replace("{song_artist_upper}", songArtist.toUpperCase())
                .replace("{song_artist_lower}", songArtist.toLowerCase())
        }

        return status.slice(0, 128)
    }
}
