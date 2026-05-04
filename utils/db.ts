import { MongoClient, ServerApiVersion } from 'mongodb';

const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${password}@algrith.scv3snm.mongodb.net/?appName=algrith`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
    strict: true
  }
});

export const db = client.db('algrith');

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return; // ← skip if already connected

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    await initializeIndexes();
    isConnected = true;
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export const initializeIndexes = async () => {
  const database = client.db('algrith');
  await database.collection('users').createIndex({ email: 1 }, { unique: true });

  // Auto-delete token documents when expiresAt is reached
  await database.collection('tokens').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );
};

dbConnect().catch(console.dir);