export class Autooffset {
    public keys: number[]

    public limit: number

    constructor() {
        this.keys = []

        this.limit = 0
    }

    public addValue(value: number): void {
        this.keys.pop()

        this.keys.unshift(value)
    }

    public getAverageValue(): number {
        let value = 0

        for (const key of this.keys) {
            value += key
        }

        return value / this.keys.length
    }

    public setLimit(limit: number): void {
        this.limit = limit

        this.keys.splice(limit)

        for (let i = limit; i > this.keys.length; i--) {
            this.keys.push(0)
        }
    }
}