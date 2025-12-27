import { IReplyMessageMetadata } from "./IReplyMessageMetadata"

export interface IMessageMetadata {
    id: string
    type: string
    reply: Partial<IReplyMessageMetadata>
}
