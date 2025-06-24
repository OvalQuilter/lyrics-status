import { IPacketMetadata } from "../IPacketMetadata"
import WebSocket from "ws"

export abstract class BasePacketHandler<T> {
    public abstract handle(client: WebSocket, data: T, metadata: IPacketMetadata): void
}
