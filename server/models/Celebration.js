import mongoose from 'mongoose';

/**
 * Celebration Schema - Stores birthday celebration data
 * Tracks YES/NO clicks, timestamps, and device information
 * Note: This is optional - the app works without MongoDB
 */
const celebrationSchema = new mongoose.Schema(
  {
    clickType: {
      type: String,
      enum: ['YES', 'NO'],
      required: true,
    },
    noClickCount: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    deviceInfo: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create model - won't fail if MongoDB not connected
let Celebration;
try {
  Celebration = mongoose.model('Celebration', celebrationSchema);
} catch (e) {
  // Model already exists or MongoDB not connected
  Celebration = mongoose.model('Celebration');
}

export default Celebration;
