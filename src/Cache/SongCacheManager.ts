import fsPromises from "node:fs/promises"
import path from "path"
import { Logger } from "pino"
import { v5 as uuidv5 } from "uuid"
import { parse as yamlParse, stringify as yamlStringify } from "yaml"
import { LogManager } from "../Debug/LogManager"
import { LRC_PATHS } from "../LrcPaths"
import { PlaybackState } from "../Playback/PlaybackState"
import { ISongCacheEntry } from "./ISongCacheEntry"
import { SongCacheEntrySchema } from "./Schemas/SongCacheEntrySchema";

export class SongCacheManager {
    public static SONGS_CACHE_PATH: string = LRC_PATHS.SONGS_CACHE

    public static UUID_NAMESPACE = "a68b2cf1-2583-4e1f-aa63-d442f2a72354"

    private _cacheFileNames = new Set<string>()

    private _logger: Logger = LogManager.instance.getClassLogger("SongCacheManager")

    public constructor() {
        void this._fetchCacheFileNames()
    }

    public async fetchCachedSong(name: string, artist: string): Promise<ISongCacheEntry | null> {
        const fileName = this._transformFullSongName(name, artist) + ".yml"

        if (!this._cacheFileNames.has(fileName)) {
            return null
        }

        const contents = await fsPromises.readFile(
            path.join(SongCacheManager.SONGS_CACHE_PATH, fileName),
            "utf-8"
        )
            .catch((error: any) => {
                this._logger.error({ error }, "Failed to read song cache data from the cache folder.")
            })

        if (!contents) {
            return null
        }

        const parsed = yamlParse(contents)

        if (!SongCacheEntrySchema.safeParse(parsed).success) {
            this._logger.warn({ fileName }, `Got invalid data from a cached song entry.`)

            return null
        }

        return parsed as ISongCacheEntry
    }

    public async cacheSong(playbackState: PlaybackState): Promise<void> {
        const transformedName = this._transformFullSongName(playbackState.songName, playbackState.songArtist)

        const exists = await fsPromises.stat(transformedName)
            .then(() => true)
            .catch((error: Error) => {
                if (error.message.includes("ENOENT")) {
                    return false
                }

                this._logger.error({ error },
                    "An unexpected error occurred while checking if " +
                    "a song exists in the cache. OK if nothing broke after.",
                )

                return false
            })

        if (exists) {
            return
        }

        const entry: ISongCacheEntry = {
            name: playbackState.songName,
            artist: playbackState.songArtist,
            lyrics: playbackState.lyrics,
            lyricsPath: null,
            _transformedFullName: transformedName,
        }

        await fsPromises.writeFile(
            path.join(SongCacheManager.SONGS_CACHE_PATH, transformedName + ".yml"), yamlStringify(entry),
        )
            .catch((error: any) => {
                this._logger.error({ error }, "Failed to write song cache data to the cache folder. ")
            })
    }

    private async _fetchCacheFileNames(): Promise<void> {
        const files = await fsPromises.readdir(SongCacheManager.SONGS_CACHE_PATH)
            .catch((error: any) => {
                this._logger.error({ error }, "Failed to get file list from the cache folder.")
            })

        if (!files) {
            return
        }

        for (const file of files) {
            this._cacheFileNames.add(file)
        }
    }

    private _transformFullSongName(name: string, artist: string): string {
        return uuidv5(
            Buffer.from(`${name} - ${artist}`).toString("base64"), SongCacheManager.UUID_NAMESPACE,
        )
    }
}
