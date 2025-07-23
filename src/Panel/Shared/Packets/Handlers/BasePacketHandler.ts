import { IClient } from "../IClient"
import { Packet } from "../Packet"

export abstract class BasePacketHandler<T> {
    public abstract handle(client: IClient, packet: Packet<T>): void
}
