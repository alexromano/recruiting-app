import { MongoClient, Db } from 'mongodb';

async function seedDb() {
    const client = new MongoClient('mongodb://admin:password@localhost:27017');
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('recruiting-app');

    await db.collection('User').insertOne({
        keywords: ['Software Engineer']
    });

    console.log('Seeded User collection');
    process.exit(0);
};

seedDb();