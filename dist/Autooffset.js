"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autooffset = void 0;
class Autooffset {
    constructor() {
        this.keys = [];
        this.limit = 0;
    }
    addValue(value) {
        console.log(value);
        this.keys.pop();
        this.keys.unshift(value);
    }
    getAverageValue() {
        let value = 0;
        for (const key of this.keys) {
            value += key;
        }
        return value / this.keys.length;
    }
    setLimit(limit) {
        this.limit = limit;
        this.keys.splice(limit);
        for (let i = limit; i > this.keys.length; i--) {
            this.keys.push(0);
        }
    }
}
exports.Autooffset = Autooffset;
