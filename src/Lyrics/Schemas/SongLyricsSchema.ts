import { SongLyricsPartialSchema } from "./SongLyricsPartialSchema"
import { LyricsMetadataSchema } from "./LyricsMetadataSchema"

export const SongLyricsSchema = SongLyricsPartialSchema.extend({
    meta: LyricsMetadataSchema
})
