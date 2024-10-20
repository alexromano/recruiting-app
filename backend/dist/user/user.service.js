"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../db/utils");
let UserService = UserService_1 = class UserService {
    constructor() {
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async getUser() {
        const { user: userCollection } = (0, utils_1.getDbCollections)();
        const userObject = await userCollection.findOne({});
        if (!userObject) {
            throw new Error('No user found');
        }
        return userObject;
    }
    async updateKeywords(keywords) {
        this.logger.log(`Updating keywords to ${keywords}`);
        const { user: userCollection } = (0, utils_1.getDbCollections)();
        const userObject = await userCollection.findOne({});
        if (!userObject) {
            throw new Error('No user found');
        }
        userCollection.updateOne({
            _id: userObject._id
        }, {
            $set: { keywords: [...userObject.keywords, ...keywords] }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map