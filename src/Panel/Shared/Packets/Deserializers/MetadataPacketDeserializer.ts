import { IPacketMetadata } from "../IPacketMetadata"
import { BasePacketDeserializer } from "./BasePacketDeserializer"
import { BitStream } from "bit-buffer"
import { stringify as uuidStringify } from "uuid"

export class MetadataPacketDeserializer<T extends IPacketMetadata = IPacketMetadata> implements BasePacketDeserializer<T> {
    deserialize(data: BitStream): T {
        const id = uuidStringify(data.readArrayBuffer(16))
        const type = data.readASCIIString()
        const replyId = uuidStringify(data.readArrayBuffer(16))
        const specific = data.readBoolean()

        return {
            "id": id,
            "type": type,
            "replyId": replyId,
            "specific": specific
        } as T
    }
}