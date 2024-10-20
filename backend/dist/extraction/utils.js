"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanText = exports.cityParse = void 0;
const cityParse = (text) => {
    return text.filter((value) => {
        return [
            'San Francisco',
            'Denver',
            'New York',
            'New York City',
            'Seattle',
            'Los Angeles',
            'Boston',
            'Austin',
            'Chicago'
        ].some(city => value.includes(city));
    }, text);
};
exports.cityParse = cityParse;
const cleanText = (text) => {
    return text.split('/').map((t) => t.trim()).filter(Boolean);
};
exports.cleanText = cleanText;
//# sourceMappingURL=utils.js.map