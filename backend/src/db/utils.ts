import { MongoClient, Collection, Db } from 'mongodb';
import { User, JobBoard, JobPosting } from './model';

const uri = 'mongodb://admin:password@localhost:27017';
const client = new MongoClient(uri);

let db: Db;
let collections: Collections;

export interface Collections {
    jobBoard: Collection<JobBoard>;
    jobPosting: Collection<JobPosting>;
    user: Collection<User>;
}

export async function connectToDb(): Promise<Collections> {
    if (collections) return collections;

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('recruiting-app');
    
        collections = {
            jobBoard: db.collection<JobBoard>('jobBoard'),
            jobPosting: db.collection<JobPosting>('jobPosting'),
            user: db.collection<User>('user'),
        };
        return collections;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export function getDbCollections(): Collections {
    if (!collections) {
        throw new Error('Collections not initialized');
    }
    return collections;
}