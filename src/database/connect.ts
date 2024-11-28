import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // TODO use env
    const uri = 'mongodb://localhost:27017/nebula_test';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
