import express from "express";
const router = express.Router();
import { getQuizQuestions, evaluateQuiz } from '../controllers/quizController.js';

// Define the routes and map them to the controllers
router.get('/', getQuizQuestions);
router.post('/evaluate', evaluateQuiz);

export default router;
