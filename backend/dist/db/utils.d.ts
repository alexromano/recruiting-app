import { Collection } from 'mongodb';
import { User, JobBoard, JobPosting } from './model';
export interface Collections {
    jobBoard: Collection<JobBoard>;
    jobPosting: Collection<JobPosting>;
    user: Collection<User>;
}
export declare function connectToDb(): Promise<Collections>;
export declare function getDbCollections(): Collections;
