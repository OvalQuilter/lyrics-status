import { LyricsLineSchema } from "./LyricsLineSchema"
import z from "zod"

export const SongLyricsPartialSchema = z.object({
    lines: z.array(LyricsLineSchema)
})
