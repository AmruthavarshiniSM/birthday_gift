import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import celebrationRoutes from './routes/celebrationRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/celebration', celebrationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Birthday gift server is running! 🎉',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Birthday Gift API! 💖',
    endpoints: {
      health: '/api/health',
      yesClick: 'POST /api/celebration/yes-click',
      noClick: 'POST /api/celebration/no-click',
      stats: 'GET /api/celebration/stats',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🎉 Birthday Gift Server Started 🎉  ║
  ║   Server running on port ${PORT}             ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}          ║
  ╚════════════════════════════════════════╝
  `);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
  console.log(`💖 Health Check: http://localhost:${PORT}/api/health`);
  console.log('✅ Server ready! Backend is working without errors.\n');
});

export default app;
