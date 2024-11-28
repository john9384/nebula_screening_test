import mongoose from 'mongoose';
import { config } from '../config';
import { InternalServerError } from '../library/helpers/errors';

const connectDB = async () => {
  try {
    const uri = config.db.url;

    if (!uri) {
      throw new InternalServerError('Database URI not specified, check your env');
    }
    await mongoose.connect(uri);
    console.log(`
      ---------------------
        Database Connected
      ---------------------
    `);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
