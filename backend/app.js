import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import quizRouter from "./routes/quizRouter.js";
import stockRouter from "./routes/stockRouter.js";
import financeRouter from "./routes/financeRouter.js";
import chatRouter from "./routes/chatRouter.js";

const app=express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/news', newsRouter);
app.use("/api/v1/user", userRouter);
app.use('/api/v1/quiz', quizRouter);
app.use('/api/vi/finance', financeRouter);
app.use('/api/v1/finance', stockRouter);
app.use('/api/v1/chatbot', chatRouter);

dbConnection();

app.use(errorMiddleware);

export default app;