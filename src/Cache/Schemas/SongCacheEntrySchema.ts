import z from "zod"
import { SongLyricsSchema } from "../../Lyrics/Schemas/SongLyricsSchema";
import { SongLyricsPartialSchema } from "../../Lyrics/Schemas/SongLyricsPartialSchema";

export const SongCacheEntrySchema = z.object({
    name: z.string(),
    artist: z.string(),

    lyrics: SongLyricsSchema.or(SongLyricsPartialSchema).nullable(),
    lyricsPath: z.string().nullable(),

    _transformedFullSongName: z.string()
})
