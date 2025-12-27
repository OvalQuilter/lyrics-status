import { BaseMessageHandler } from "./MessageHandlers/BaseMessageHandler"

export class MessageDefinition<T = unknown> {
    constructor(
        public readonly type: string,
        public readonly handler?: BaseMessageHandler<T>,
    ) {}
}
