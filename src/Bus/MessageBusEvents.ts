import { Message } from "./Message"

export interface MessageBusEvents {
    "message": (message: Message<any>) => void
    [key: string]: (message: Message<any>) => void
}
