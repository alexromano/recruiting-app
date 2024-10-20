"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
exports.getDbCollections = getDbCollections;
const mongodb_1 = require("mongodb");
const uri = 'mongodb://admin:password@localhost:27017';
const client = new mongodb_1.MongoClient(uri);
let db;
let collections;
async function connectToDb() {
    if (collections)
        return collections;
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('recruiting-app');
        collections = {
            jobBoard: db.collection('jobBoard'),
            jobPosting: db.collection('jobPosting'),
            user: db.collection('user'),
        };
        return collections;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
function getDbCollections() {
    if (!collections) {
        throw new Error('Collections not initialized');
    }
    return collections;
}
//# sourceMappingURL=utils.js.map