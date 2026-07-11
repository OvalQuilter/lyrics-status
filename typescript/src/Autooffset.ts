export class Autooffset {
    public keys: number[]
    public limit: number

    constructor() {
        this.keys = []
        this.limit = 0
    }

    public addValue(value: number): void {
        if (this.keys.length >= this.limit && this.limit > 0) this.keys.pop()
        this.keys.unshift(value)
    }

    public getAverageValue(): number {
        if (this.keys.length === 0) return 0
        return this.keys.reduce((a, b) => a + b, 0) / this.keys.length
    }

    public setLimit(limit: number): void {
        this.limit = limit
        if (this.keys.length > limit) this.keys.splice(limit)
    }
}
