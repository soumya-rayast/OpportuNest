import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
