import { EventEmitter } from "eventemitter3"
import { Message } from "./Message"
import { MessageBusEvents } from "./MessageBusEvents"
import { MessageDefinition } from "./MessageDefinition"
import { RequestHandler } from "./RequestHandler"

/*
 * MessageBus
 *
 * A message bus is a message broker that allows for communication between different parts of the application without
 * the need of complicated class hierarchies or dependencies.
 *
 * While it comes with a bit of overhead, it is a much better alternative especially in an asynchronous environment.
 *
 * Also, it can be used as a simple event listener using EventEmitter's methods, though reply logic won't work in this
 * case.
 */
export class MessageBus<T extends MessageBusEvents = MessageBusEvents> extends EventEmitter<T> {
    private _handler = new RequestHandler<MessageDefinition, Message>()

    public registerMessageDefinition(definition: MessageDefinition): void {
        this._handler.registerDefinition(definition.type, definition)
    }

    public registerMessageDefinitions(definitions: MessageDefinition[]): void {
        definitions.forEach((definition) => {
            this.registerMessageDefinition(definition)
        })
    }

    public unregisterMessageDefinition(type: string): void {
        this._handler.unregisterDefinition(type)
    }

    public publish<T>(message: Message<T>): void {
        this._processMessage(message)
    }

    public getMessageReply(id: string): Promise<Message> {
        return this._handler.addReplyPromise(id)
    }

    private _processMessage<T>(message: Message<T>): void {
        const definition = this._handler.getDefinition(message.metadata.type)

        if (definition) {
            definition.handler?.handle(message)

            if (message.metadata.reply.replyId) {
                this._handler.resolveReply(message.metadata.reply.replyId, message)

                if (message.metadata.reply.specific) {
                    return
                }
            }

            (this as EventEmitter<MessageBusEvents>).emit("message", message);
            (this as EventEmitter<MessageBusEvents>).emit(message.metadata.type, message)
        }
    }
}
