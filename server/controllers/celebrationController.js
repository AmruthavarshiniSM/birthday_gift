import Celebration from '../models/Celebration.js';

/**
 * Handle YES button click
 */
export const handleYesClick = async (req, res) => {
  try {
    const { timestamp, userAgent } = req.body;

    console.log('✅ YES Click received!');

    // Try to save to database if MongoDB is connected
    try {
      await Celebration.create({
        clickType: 'YES',
        timestamp: timestamp || Date.now(),
        userAgent: userAgent || req.headers['user-agent'],
        ipAddress: req.ip,
        message: 'User accepted the friendship request!',
      }).catch(() => {
        // Silently fail if MongoDB not connected
      });
      console.log('📝 Saved YES click to database');
    } catch (dbError) {
      console.warn('⚠️  Could not save to database (MongoDB may not be connected)');
    }

    // Always return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for saying YES! 🎉',
      data: {
        clickType: 'YES',
        timestamp: timestamp || Date.now(),
        emoji: '❤️',
      },
    });
  } catch (error) {
    console.error('Error handling YES click:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error processing your response',
      message: error.message,
    });
  }
};

/**
 * Handle NO button click
 */
export const handleNoClick = async (req, res) => {
  try {
    const { clickCount, timestamp, userAgent } = req.body;

    console.log(`🔴 NO Click received! (Count: ${clickCount})`);

    // Try to save to database if MongoDB is connected
    try {
      await Celebration.create({
        clickType: 'NO',
        noClickCount: clickCount || 1,
        timestamp: timestamp || Date.now(),
        userAgent: userAgent || req.headers['user-agent'],
        ipAddress: req.ip,
        message: `User clicked NO ${clickCount || 1} time(s)`,
      }).catch(() => {
        // Silently fail if MongoDB not connected
      });
      console.log('📝 Saved NO click to database');
    } catch (dbError) {
      console.warn('⚠️  Could not save to database (MongoDB may not be connected)');
    }

    const messages = [
      'Really? 🥺',
      'Please accept my request 😭',
      'Please 🥺💔',
    ];

    const message = messages[Math.min(clickCount - 1, 2)] || 'Come on! 💔';

    res.status(200).json({
      success: true,
      message,
      data: {
        clickType: 'NO',
        clickCount: clickCount || 1,
        timestamp: timestamp || Date.now(),
        emoji: '💔',
      },
    });
  } catch (error) {
    console.error('Error handling NO click:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error processing your response',
      message: error.message,
    });
  }
};

/**
 * Get celebration statistics
 */
export const getCelebrationStats = async (req, res) => {
  try {
    console.log('📊 Fetching celebration statistics...');

    let stats = {
      totalClicks: 0,
      yesClicks: 0,
      noClicks: 0,
      totalNoClickCount: 0,
      message: 'No database data available',
      databaseConnected: false,
    };

    // Try to fetch from database
    try {
      const yesCount = await Celebration.countDocuments({ clickType: 'YES' }).catch(() => 0);
      const noCount = await Celebration.countDocuments({ clickType: 'NO' }).catch(() => 0);
      const noClicksData = await Celebration.aggregate([
        { $match: { clickType: 'NO' } },
        { $group: { _id: null, totalNoClicks: { $sum: '$noClickCount' } } },
      ]).catch(() => []);

      stats = {
        totalClicks: yesCount + noCount,
        yesClicks: yesCount,
        noClicks: noCount,
        totalNoClickCount: noClicksData[0]?.totalNoClicks || 0,
        message: 'Statistics retrieved from database',
        databaseConnected: true,
      };

      console.log('✅ Statistics:', stats);
    } catch (dbError) {
      console.warn('⚠️  Could not fetch from database');
      stats.message = 'Database not connected - showing default stats';
      stats.databaseConnected = false;
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error fetching statistics',
      message: error.message,
    });
  }
};
