import { BasePacketSerializer } from "./BasePacketSerializer"
import { IPacketMetadata } from "../IPacketMetadata"
import { BitStream } from "bit-buffer"
import { parse as uuidParse } from "uuid"

export class MetadataPacketSerializer<T extends IPacketMetadata = IPacketMetadata> implements BasePacketSerializer<T> {
    serialize(data: T): BitStream {
        const stream = new BitStream(new Uint8Array(16 + 32 + 16 + 1).buffer as ArrayBuffer)
        const idStream = new BitStream(uuidParse(data.id).buffer as ArrayBuffer)

        stream.writeBitStream(idStream)
        stream.writeASCIIString(data.type)

        if (data.replyId && data.specific) {
            const replyIdStream = new BitStream(uuidParse(data.replyId).buffer as ArrayBuffer)

            stream.writeBitStream(replyIdStream)
            stream.writeBoolean(data.specific)
        }

        return stream
    }
}