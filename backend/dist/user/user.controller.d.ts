import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): Promise<import("mongodb").WithId<import("../db/model").User>>;
    updateKeywords(body: {
        keywords: string[];
    }): Promise<void>;
}
