import { IMessageMetadata } from "./IMessageMetadata"

export class Message<T = unknown> {
    constructor(
        public data: T,
        public metadata: IMessageMetadata,
    ) {}
}
