"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autooffset = void 0;
class Autooffset {
    constructor() { this.keys = []; this.limit = 0; }
    addValue(v) { if (this.keys.length >= this.limit) this.keys.pop(); this.keys.unshift(v); }
    getAverageValue() { return this.keys.length ? this.keys.reduce((a, b) => a + b, 0) / this.keys.length : 0; } getMedianValue() { if(!this.keys.length) return 0; const s=[...this.keys].sort((x,y)=>x-y); const m=s.length>>1; return s.length%2?s[m]:(s[m-1]+s[m])/2; }
    setLimit(l) { this.limit = l; if (this.keys.length > l) this.keys.splice(l); }
}
exports.Autooffset = Autooffset;
