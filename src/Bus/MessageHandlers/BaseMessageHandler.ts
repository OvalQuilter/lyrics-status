import { Message } from "../Message"

export abstract class BaseMessageHandler<T> {
    public abstract handle(message: Message<T>): void
}
