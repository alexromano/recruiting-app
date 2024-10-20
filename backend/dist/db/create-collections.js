"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
async function initializeCollections() {
    const client = new mongodb_1.MongoClient('mongodb://admin:password@localhost:27017');
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('recruiting-app');
    await db.createCollection('User', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                properties: {
                    keywords: { bsonType: "array", items: { bsonType: "string" } },
                }
            }
        }
    });
    await db.createCollection('JobBoard', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["id", "company", "slug", "platform"],
                properties: {
                    id: { bsonType: "string" },
                    company: { bsonType: "string" },
                    slug: { bsonType: "string" },
                    platform: { bsonType: "string" }
                }
            }
        }
    });
    await db.createCollection('JobPosting', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["id", "company_id", "title", "url", "locations", "salary_range", "yoe"],
                properties: {
                    id: { bsonType: "string" },
                    company_id: { bsonType: "string" },
                    title: { bsonType: "string" },
                    url: { bsonType: "string" },
                    locations: { bsonType: "array", items: { bsonType: "string" } },
                    salary_range: { bsonType: "array", items: { bsonType: "string" } },
                    yoe: { bsonType: "string" }
                }
            }
        }
    });
    console.log('Collections initialized');
    process.exit(0);
}
initializeCollections();
//# sourceMappingURL=create-collections.js.map