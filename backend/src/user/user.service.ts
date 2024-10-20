import { Logger, Injectable } from "@nestjs/common";
import { getDbCollections } from '../db/utils';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    
    async getUser() {
        const { user: userCollection } = getDbCollections();
        const userObject = await userCollection.findOne({});
        if (!userObject) { throw  new Error('No user found'); }
        return userObject;
    }

    async updateKeywords(keywords: string[]) {
        this.logger.log(`Updating keywords to ${keywords}`);
        const { user: userCollection } = getDbCollections();
        const userObject = await userCollection.findOne({});
        if (!userObject) { throw  new Error('No user found'); }
        userCollection.updateOne(
            {
                _id: userObject._id
            },
            {
                $set: { keywords: [...userObject.keywords, ...keywords] }
            });
    }
}