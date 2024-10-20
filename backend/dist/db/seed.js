"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
async function seedDb() {
    const client = new mongodb_1.MongoClient('mongodb://admin:password@localhost:27017');
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('recruiting-app');
    await db.collection('User').insertOne({
        keywords: ['Software Engineer']
    });
    console.log('Seeded User collection');
    process.exit(0);
}
;
seedDb();
//# sourceMappingURL=seed.js.map