import mongoose from 'mongoose';

export async function connectDB() {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error('MONGO_URL is not defined in .env');
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(url);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}
