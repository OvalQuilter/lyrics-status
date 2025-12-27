import { Logger } from "pino"
import { LogManager } from "../Debug/LogManager"
import { PlaybackState } from "./PlaybackState"
import { BaseService } from "./Services/Base/BaseService"
import { PlaybackStateSchema } from "./Services/Base/PlaybackStateSchema"

export class PlaybackManager {
    public state: PlaybackState = new PlaybackState()

    private _services: BaseService[] = []

    private _logger: Logger = LogManager.instance.getClassLogger("PlaybackManager")

    public registerService(service: BaseService) {
        this._services.push(service)
    }

    public async refreshPlaybackState(): Promise<PlaybackState | null> {
        for (const service of this._services) {
            const state = await service.getPlaybackState().catch((error: any) => {
                this._logger.error({ error }, `Playback service "${service.name}" unexpectedly got error during state fetching.`)
            })

            if (!state) {
                continue
            }
            if (!PlaybackStateSchema.safeParse(state).success) {
                this._logger.warn(
                    "Failed to parse playback state result from a playback service " +
                    `"${service.name}", possible invalid schema?`,
                )
                continue
            }

            this.state.meta.serviceName = service.name
            this.state.meta.serviceSongId = state.songId

            this.state.songName = state.songName
            this.state.songArtist = state.songArtist
            this.state.songAlbum = state.songAlbum

            this.state.oldSongId = this.state.songId
            this.state.songId = state.songId

            this.state.songDuration = state.songDuration
            this.state.songProgress = state.songProgress

            this.state.isPlaying = state.isPlaying

            return this.state
        }

        this._logger.warn("refreshPlaybackState() will return null as no playback states were fetched.")

        return null
    }
}
