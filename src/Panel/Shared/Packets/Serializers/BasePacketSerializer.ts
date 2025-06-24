import { BitStream } from "bit-buffer"

export abstract class BasePacketSerializer<T> {
    public abstract serialize(data: T): BitStream
}
