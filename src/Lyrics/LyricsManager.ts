import { Logger } from "pino"
import { LogManager } from "../Debug/LogManager"
import { ISongLyrics } from "./ISongLyrics"
import { ISongLyricsPartial } from "./ISongLyricsPartial"
import { BaseSource } from "./Sources/BaseSource"

export class LyricsManager {
    private _sources: BaseSource[] = []

    private _logger: Logger = LogManager.instance.getClassLogger("LyricsManager")

    public addSource(source: BaseSource) {
        this._sources.push(source)
    }

    public async fetchLyrics(song: string, artist: string): Promise<ISongLyrics | ISongLyricsPartial | null> {
        for (const source of this._sources) {
            const lyrics = await source.getLyrics(song, artist).catch((error: any) => {
                this._logger.warn({ error }, `Got unexpected error from a source "${source.sourceName}".`)
            })

            if (lyrics && lyrics.lines.length > 0) {
                return lyrics
            }
        }

        return null
    }
}
