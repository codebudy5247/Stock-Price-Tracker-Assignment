import mongoose from 'mongoose';

const dbUrl = 'mongodb+srv://ashekhar5247:E9FdA6D67YPFz76D@cluster0.kqlwbyy.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ ✅ Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
