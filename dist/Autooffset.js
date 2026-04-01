"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autooffset = void 0;

class Autooffset {
    constructor() {
        this.keys = [];
        this.limit = 0;
    }
    addValue(value) {
        if (this.keys.length >= this.limit && this.limit > 0) this.keys.pop();
        this.keys.unshift(value);
    }
    getAverageValue() {
        if (this.keys.length === 0) return 0;
        return this.keys.reduce((a, b) => a + b, 0) / this.keys.length;
    }
    setLimit(limit) {
        this.limit = limit;
        // Trim excess entries if limit shrunk; never pad with zeros
        if (this.keys.length > limit) this.keys.splice(limit);
    }
}
exports.Autooffset = Autooffset;
