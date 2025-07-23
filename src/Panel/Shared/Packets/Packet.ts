import { IPacketMetadata } from "./IPacketMetadata"

export class Packet<T = unknown> {
    public data: T
    public metadata: IPacketMetadata

    constructor(data: T, metadata: IPacketMetadata) {
        this.data = data
        this.metadata = metadata
    }
}
