import z from "zod/index"
import { IServicePlaybackStateData } from "./IServicePlaybackState"

export const PlaybackStateSchema: z.ZodType<IServicePlaybackStateData> = z.object({
    songId: z.string(),
    songName: z.string(),
    songArtist: z.string(),
    songAlbum: z.string(),

    songDuration: z.number(),
    songProgress: z.number(),

    playable: z.boolean(),

    isPlaying: z.boolean(),
})
