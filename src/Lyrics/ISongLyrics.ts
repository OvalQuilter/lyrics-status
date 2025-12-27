import { ILyricsMetadata } from "./ILyricsMetadata"
import { ISongLyricsPartial } from "./ISongLyricsPartial"

export interface ISongLyrics extends ISongLyricsPartial {
    meta: ILyricsMetadata
}
