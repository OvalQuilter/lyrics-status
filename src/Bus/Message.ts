import { IMessageMetadata } from "./IMessageMetadata"

export class Message<T = unknown> {
    public data: T
    public metadata: IMessageMetadata

    constructor(data: T, metadata: IMessageMetadata) {
        this.data = data
        this.metadata = metadata
    }
}
