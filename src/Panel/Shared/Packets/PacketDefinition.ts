import { BasePacketHandler } from "./Handlers/BasePacketHandler"
import { BasePacketSerializer } from "./Serializers/BasePacketSerializer"
import { BasePacketDeserializer } from "./Deserializers/BasePacketDeserializer"

export class PacketDefinition {
    public type: string

    public handler: BasePacketHandler<any> | undefined
    public serializer: BasePacketSerializer<any> | undefined
    public deserializer: BasePacketDeserializer<any> | undefined

    constructor(name: string,
                handler?: BasePacketHandler<any>,
                serializer?: BasePacketSerializer<any>,
                deserializer?: BasePacketDeserializer<any>) {
        this.type = name

        this.handler = handler
        this.serializer = serializer
        this.deserializer = deserializer
    }
}
