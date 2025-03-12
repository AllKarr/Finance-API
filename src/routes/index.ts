import express from "express";
import transactionRoutes from "./transactionRoutes";
import budgetRoutes from "./budgetRoutes";

const router = express.Router();

router.use("/transactions", transactionRoutes);
router.use("/budgets", budgetRoutes);

export default router;
