"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionService = void 0;
const lever_1 = require("./lever");
const common_1 = require("@nestjs/common");
let ExtractionService = class ExtractionService {
    getExtractor(url) {
        const parsedURL = URL.parse(url);
        console.log(parsedURL);
        if (!parsedURL)
            throw new Error(`Failed to parse URL: ${url}`);
        const domain = parsedURL.hostname;
        console.log(domain);
        if (domain.includes('lever.co')) {
            return new lever_1.LeverExtractor();
        }
        return null;
    }
};
exports.ExtractionService = ExtractionService;
exports.ExtractionService = ExtractionService = __decorate([
    (0, common_1.Injectable)()
], ExtractionService);
//# sourceMappingURL=extraction.service.js.map