import express from 'express';
import { handleYesClick, handleNoClick, getCelebrationStats } from '../controllers/celebrationController.js';

const router = express.Router();

/**
 * POST /api/celebration/yes-click
 * Handle YES button click
 */
router.post('/yes-click', handleYesClick);

/**
 * POST /api/celebration/no-click
 * Handle NO button click
 */
router.post('/no-click', handleNoClick);

/**
 * GET /api/celebration/stats
 * Get celebration statistics
 */
router.get('/stats', getCelebrationStats);

export default router;
