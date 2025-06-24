import { EventEmitter } from "eventemitter3"
import WebSocket, { WebSocketServer } from "ws"
import { PacketDefinition } from "./PacketDefinition"
import { MetadataPacketSerializer } from "./Serializers/MetadataPacketSerializer"
import { MetadataPacketDeserializer } from "./Deserializers/MetadataPacketDeserializer"
import { BitStream } from "bit-buffer"
import { v4 as uuidv4 } from "uuid"
import { IPacketMetadata } from "./IPacketMetadata"

interface PacketManagerEvents {
    "packet": (client: WebSocket, data: unknown, metadata: IPacketMetadata) => void
}

export class PacketManager extends EventEmitter {
    public wss: WebSocketServer

    private _packets: PacketDefinition[]

    private _metadataSerializer: MetadataPacketSerializer
    private _metadataDeserializer: MetadataPacketDeserializer

    constructor(wss: WebSocketServer) {
        super()

        this.wss = wss

        this._packets = []

        this._metadataSerializer = new MetadataPacketSerializer()
        this._metadataDeserializer = new MetadataPacketDeserializer()

        this._init()
    }

    public registerPacketDefinition(packetDefinition: PacketDefinition): void {
        this._packets.push(packetDefinition)
    }

    public registerPacketDefinitions(packetDefinitions: PacketDefinition[]): void {
        this._packets.push(...packetDefinitions)
    }

    private _init(): void {
        this.wss.on("connection", (ws) => {
            ws.on("message", (data, isBinary) => this._receivePacket(ws, data, isBinary))
        })
    }

    private _receivePacket(client: WebSocket, data: WebSocket.RawData, isBinary: boolean) {
        if (!isBinary) return
        if (!(data instanceof Buffer) || !(data instanceof ArrayBuffer)) return

        this._processPacket(client, data)
    }

    private _processPacket(client: WebSocket, rawData: Buffer | ArrayBuffer) {
        const stream = new BitStream(rawData)
        const metadata = this._metadataDeserializer.deserialize(stream)
        const packet = this._packets.find(p => p.type === metadata.type)

        if (packet) {
            const packetData = packet.deserializer ? packet.deserializer.deserialize(stream) : null

            if (packet.handler) packet.handler.handle(client, packetData, metadata)

            this.emit("packet", client, packetData, metadata)
        }
    }

    private _sendPacket(client: WebSocket, name: string, data: unknown, replyId?: string, specific?: boolean) {
        const packetDefinition = this._packets.find((p) => p.type === name)

        if (!packetDefinition) return

        const metadata = {
            id: uuidv4(),
            type: name,
            replyId,
            specific
        }

        const stream = this._metadataSerializer.serialize(metadata)
        const payloadStream = packetDefinition.serializer ? packetDefinition.serializer.serialize(data) : null

        const metadataLength = stream.buffer.length
        const payloadLength = payloadStream ? payloadStream.buffer.length : 0

        const sendData = new BitStream(new ArrayBuffer(metadataLength + payloadLength))

        client.send(sendData.buffer)
    }
}
