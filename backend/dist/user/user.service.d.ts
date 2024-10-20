export declare class UserService {
    private readonly logger;
    getUser(): Promise<import("mongodb").WithId<import("../db/model").User>>;
    updateKeywords(keywords: string[]): Promise<void>;
}
