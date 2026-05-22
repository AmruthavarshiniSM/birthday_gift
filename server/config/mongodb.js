import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connect to MongoDB
 * Note: This is optional. The backend can work without MongoDB for basic functionality.
 * Call this function to enable database features.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/birthday-gift';
    
    // Set timeout for connection attempts
    const conn = await Promise.race([
      mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 15000)
      ),
    ]);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn('⚠️  MongoDB Connection Failed (Database features disabled)');
    console.warn(`   Reason: ${error.message}`);
    console.log('   ℹ️  The app will work without database persistence');
    return null;
  }
};

export default connectDB;
