export class ReplyPromise<T> {
    constructor(
        public resolve: (value: T | PromiseLike<T>) => void,
        public reject: (reason?: any) => void,
    ) {}
}
