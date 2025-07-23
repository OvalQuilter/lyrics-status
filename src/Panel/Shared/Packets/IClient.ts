import { EventEmitter } from "eventemitter3"

export interface ClientEvents {
    message: (data: any) => void
    open: () => void
    close: () => void
    error: () => void
}

export interface IClient extends EventEmitter<ClientEvents> {
    send(data: any): void
}
