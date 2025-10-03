import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongodb connected successfully');
  } catch (error) {
    console.error('error connected to mongodb', error);
    process.exit(1);
  }
};

export default connectDB;
