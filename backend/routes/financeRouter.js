import express from "express";
import { getStockData } from "../controllers/financeController.js";

const router = express.Router();

// Fetch stock data by ticker symbol
router.get("/stock/:ticker", getStockData);

export default router;