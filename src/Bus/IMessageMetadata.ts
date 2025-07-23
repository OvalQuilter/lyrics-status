import { IReplyMessageMetadata } from "./IReplyMessageMetadata"

export interface IMessageMetadata extends Partial<IReplyMessageMetadata> {
    id: string
    type: string
}
