import express from 'express';
import { getStockRecommendations } from '../controllers/stockController.js';

const router = express.Router();

router.get('/recommendations', getStockRecommendations);

export default router;