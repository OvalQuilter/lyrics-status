import z from "zod"

export const LyricsMetadataSchema = z.object({
    sourceName: z.string(),
    sourceSongId: z.string().optional()
})
