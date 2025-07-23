import { IReplyPacketMetadata } from "./IReplyPacketMetadata"

export interface IPacketMetadata extends Partial<IReplyPacketMetadata> {
    id: string
    type: string
}
