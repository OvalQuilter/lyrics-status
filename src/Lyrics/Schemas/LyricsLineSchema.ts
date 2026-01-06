import z from "zod"

export const LyricsLineSchema = z.object({
    timestamp: z.number(),
    text: z.string()
})
