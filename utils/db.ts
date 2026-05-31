import { Token, User } from '@/libs/schema';
import mongoose from 'mongoose';

const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${password}@algrith.scv3snm.mongodb.net/algrith`;
let isConnected = false;

export const initializeIndexes = async () => {
  await Token.collection.createIndexes([{
    key: { expiresAt: 1 }
  }], {
    expireAfterSeconds: 0
  });
  
  await User.collection.createIndexes([{
    key: { email: 1 }
  }], {
    unique: true
  });
};

export const dbConnect = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
    // await initializeIndexes();
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};