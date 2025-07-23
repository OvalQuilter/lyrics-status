export class QueueReplyMessage {
    public resolve: (value?: unknown) => void
    public reject: (reason?: any) => void

    constructor(resolve: (value?: unknown) => void, reject: (reason?: any) => void) {
        this.resolve = resolve
        this.reject = reject
    }
}
