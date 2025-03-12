import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transactionRoutes";
import budgetRoutes from "./routes/budgetRoutes"; // ✅ Import budget routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes); // Register transaction routes
app.use("/api/budgets", budgetRoutes); // ✅ Register budget routes

// Database Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

export default app;
