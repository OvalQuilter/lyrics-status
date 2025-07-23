import { BaseMessageHandler } from "./Handlers/BaseMessageHandler"

export class MessageDefinition<T = unknown> {
    public readonly type: string
    public readonly handler: BaseMessageHandler<T> | undefined

    constructor(type: string, handler?: BaseMessageHandler<T>) {
        this.type = type
        this.handler = handler
    }
}
