import express from 'express';
import { getStockRecommendations } from '../controllers/stockController.js';

const router = express.Router();

router.post('/recommendations', getStockRecommendations);

export default router;