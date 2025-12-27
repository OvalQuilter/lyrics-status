export class Autooffset {
    private _keys: number[] = []

    private _limit = 0

    public addValue(value: number): void {
        this._keys.pop()
        this._keys.unshift(value)
    }

    public getAverageValue(): number {
        let value = 0

        for (const key of this._keys) {
            value += key
        }

        return value / this._keys.length
    }

    public setLimit(limit: number): void {
        this._limit = limit

        this._keys.splice(limit)

        for (let i = limit; i > this._keys.length; i--) {
            this._keys.push(0)
        }
    }
}
