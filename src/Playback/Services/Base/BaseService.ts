import { IServicePlaybackStateData } from "./IServicePlaybackState"

export abstract class BaseService {
    public abstract getPlaybackState(): Promise<IServicePlaybackStateData>

    public abstract get name(): string
}
