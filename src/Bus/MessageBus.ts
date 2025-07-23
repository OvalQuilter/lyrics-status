import { EventEmitter } from "eventemitter3"
import { v4 as uuidv4 } from "uuid"
import { Message } from "./Message"
import { MessageDefinition } from "./MessageDefinition"
import { QueueReplyMessage } from "./QueueReplyMessage"
import { IMessageMetadata } from "./IMessageMetadata"

interface MessageBusEvents {
    "message": (message: Message) => void
    "_reply": (message: Message) => void
    [key: string]: (message: Message) => void
}

export class MessageBus extends EventEmitter<MessageBusEvents> {
    private _messages: Map<string, MessageDefinition> = new Map()

    private _pendingReplies: {
        [key: string]: QueueReplyMessage[]
    }

    constructor() {
        super()

        this._pendingReplies = {}

        this.on("_reply", (message) => {
            this._pendingReplies[message.metadata.replyId!].forEach((r) => {
                r.resolve(message)
            })
        })
    }

    public registerMessageDefinition(messageDefinition: MessageDefinition): void {
        this._messages.set(messageDefinition.type, messageDefinition)
    }

    public registerMessageDefinitions(messageDefinitions: MessageDefinition[]): void {
        messageDefinitions.forEach((messageDefinition) => {
            this._messages.set(messageDefinition.type, messageDefinition)
        })
    }

    public unregisterMessageDefinition(messageType: string): void {
        this._messages.delete(messageType)
    }

    public publish<T>(type: string, data: T, replyId?: string, specific?: boolean): void {
        const metadata: IMessageMetadata = {
            id: uuidv4(),
            type,
            replyId,
            specific
        }

        const message = new Message(data, metadata)

        this._processMessage(message)
    }

    public getMessageReply(id: string): Promise<unknown> {
        if (!this._pendingReplies[id]) this._pendingReplies[id] = []
        
        return new Promise((resolve, reject) => {
            this._pendingReplies[id].push(new QueueReplyMessage(resolve, reject))
        })
    }

    private _processMessage<T>(message: Message<T>): void {
        const messageDefinition = this._messages.get(message.metadata.type)

        if (messageDefinition) {
            if (messageDefinition.handler) {
                messageDefinition.handler.handle(message)
            }

            if (message.metadata.replyId) {
                if (!this._pendingReplies[message.metadata.replyId]) this._pendingReplies[message.metadata.replyId] = []

                this.emit("_reply", message)
            }

            this.emit("message", message)
            this.emit(message.metadata.type, message)
        }
    }
}
