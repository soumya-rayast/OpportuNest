import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoute from "./routes/applicationRoutes.js";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use("/api/v1/application", applicationRoute);

// Server Configuration
const PORT = process.env.PORT || 3000;

// Start Server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });
