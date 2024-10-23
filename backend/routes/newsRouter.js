// routes/newsRoutes.js
import express from "express";
import { getLatestNews } from "../controllers/newsController.js";

const router = express.Router();

// Define route for fetching latest news
router.get('/', getLatestNews);

export default router;
