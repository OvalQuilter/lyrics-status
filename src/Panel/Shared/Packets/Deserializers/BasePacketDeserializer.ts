import { BitStream } from "bit-buffer"

export abstract class BasePacketDeserializer<T> {
    public abstract deserialize(data: BitStream): T
}
