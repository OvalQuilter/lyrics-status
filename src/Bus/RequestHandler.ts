import { ReplyPromise } from "./ReplyPromise"

export class RequestHandler<TDefinition, TReply> {
    private _definitions  = new Map<string, TDefinition>()

    private _pendingReplies = new Map<string, ReplyPromise<TReply>[]>()

    public registerDefinition(type: string, definition: TDefinition): void {
        this._definitions.set(type, definition)
    }

    public unregisterDefinition(type: string): void {
        this._definitions.delete(type)
    }

    public getDefinition(type: string): TDefinition | undefined {
        return this._definitions.get(type)
    }

    public addReplyPromise(id: string): Promise<TReply> {
        return new Promise((resolve, reject) => {
            if (!this._pendingReplies.has(id)) {
                this._pendingReplies.set(id, [])
            }

            this._pendingReplies.get(id)!.push(new ReplyPromise(resolve, reject))
        })
    }

    public resolveReply(id: string, reply: TReply): void {
        const promises = this._pendingReplies.get(id)

        if (promises) {
            promises.forEach(p => p.resolve(reply))
            this._pendingReplies.delete(id)
        }
    }
}
