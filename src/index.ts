import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import router from "./routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
