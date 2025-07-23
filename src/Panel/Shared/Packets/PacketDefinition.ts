import { BasePacketSerializer } from "./Serializers/BasePacketSerializer"
import { BasePacketDeserializer } from "./Deserializers/BasePacketDeserializer"
import { BasePacketHandler } from "./Handlers/BasePacketHandler"

export class PacketDefinition<T = unknown> {
    public type: string

    public handler: BasePacketHandler<T> | undefined
    public serializer: BasePacketSerializer<T> | undefined
    public deserializer: BasePacketDeserializer<T> | undefined

    constructor(type: string,
                handler?: BasePacketHandler<T>,
                serializer?: BasePacketSerializer<T>,
                deserializer?: BasePacketDeserializer<T>) {
        this.type = type

        this.handler = handler
        this.serializer = serializer
        this.deserializer = deserializer
    }
}
