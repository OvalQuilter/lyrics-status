import { EventEmitter } from "eventemitter3"
import { PacketDefinition } from "./PacketDefinition"
import { MetadataPacketSerializer } from "./Serializers/MetadataPacketSerializer"
import { MetadataPacketDeserializer } from "./Deserializers/MetadataPacketDeserializer"
import { BitStream } from "bit-buffer"
import { v4 as uuidv4 } from "uuid"
import { IClient } from "./IClient"
import { Packet } from "./Packet"
import { QueueReplyPacket } from "./QueueReplyPacket"

interface PacketManagerEvents {
    "packet": (client: IClient, packet: Packet) => void
    "_reply": (client: IClient, packet: Packet) => void
    [key: string]: (client: IClient, packet: Packet) => void
}

export class PacketManager extends EventEmitter<PacketManagerEvents> {
    private _packets: Map<string, PacketDefinition>

    private _metadataSerializer: MetadataPacketSerializer
    private _metadataDeserializer: MetadataPacketDeserializer

    private _pendingReplies: {
        [key: string]: QueueReplyPacket[]
    }

    constructor() {
        super()

        this._packets = new Map()

        this._metadataSerializer = new MetadataPacketSerializer()
        this._metadataDeserializer = new MetadataPacketDeserializer()

        this._pendingReplies = {}

        this.on("_reply", (client, packet) => {
            this._pendingReplies[packet.metadata.replyId!].forEach((r) => {
                r.resolve(packet)
            })
        })
    }

    public registerPacketDefinition(packetDefinition: PacketDefinition): void {
        this._packets.set(packetDefinition.type, packetDefinition)
    }

    public registerPacketDefinitions(packetDefinitions: PacketDefinition[]): void {
        for (const packetDefinition of packetDefinitions) {
            this.registerPacketDefinition(packetDefinition)
        }
    }

    public unregisterPacketDefinition(type: string): void {
        this._packets.delete(type)
    }

    public receivePacket(client: IClient, data: any): void {
        if (!(data instanceof Buffer) && !(data instanceof ArrayBuffer)) return

        this._processPacket(client, data)
    }

    public sendPacket(client: IClient, type: string, data: unknown, replyId?: string, specific?: boolean): void {
        const packetDefinition = this._packets.get(type)

        if (!packetDefinition) return

        const metadata = {
            id: uuidv4(),
            type,
            replyId,
            specific
        }

        const metadataStream = this._metadataSerializer.serialize(metadata)
        const payloadStream = packetDefinition.serializer ? packetDefinition.serializer.serialize(data) : null

        const metadataLength = metadataStream.buffer.length
        const payloadLength = payloadStream ? payloadStream.buffer.length : 0

        const sendData = new BitStream(new ArrayBuffer(metadataLength + payloadLength))

        sendData.writeBitStream(metadataStream)
        if (payloadStream) sendData.writeBitStream(payloadStream)

        client.send(sendData.buffer)
    }

    public getPacketReply(id: string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this._pendingReplies[id].push(new QueueReplyPacket(resolve, reject))
        })
    }

    private _processPacket(client: IClient, rawData: Buffer | ArrayBuffer): void {
        const stream = new BitStream(rawData)
        const metadata = this._metadataDeserializer.deserialize(stream)
        const packetDefinition = this._packets.get(metadata.type)

        if (packetDefinition) {
            const packetData = packetDefinition.deserializer ? packetDefinition.deserializer.deserialize(stream) : null
            const packet = new Packet(packetData, metadata)

            if (packetDefinition.handler) packetDefinition.handler.handle(client, packet)

            if (metadata.replyId) {
                if (!this._pendingReplies[metadata.replyId]) this._pendingReplies[metadata.replyId] = []

                this.emit("_reply", client, packet)

                if (metadata.specific) return
            }

            this.emit("packet", client, packet)
            this.emit(packetDefinition.type, client, packet)
        }
    }
}
