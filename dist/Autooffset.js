"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autooffset = void 0;
class Autooffset {
    constructor() { this.keys = []; this.limit = 0; }
    addValue(v) { if (this.keys.length >= this.limit && this.limit > 0) this.keys.pop(); this.keys.unshift(v); }
    getAverageValue() { return this.keys.length ? this.keys.reduce((a, b) => a + b, 0) / this.keys.length : 0; }
    setLimit(l) { this.limit = l; if (this.keys.length > l) this.keys.splice(l); }
}
exports.Autooffset = Autooffset;
