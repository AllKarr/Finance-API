import express from "express";
import {
  getTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionsByCategory,
  getAverageSpendingPerCategory,
} from "../controllers/transactionController";

const router = express.Router();

// CRUD routes for transactions
router.get("/", getTransactions); // Get all transactions
router.post("/", createTransaction); // Create transaction
router.get("/:id", getTransactionById); // Get by ID
router.put("/:id", updateTransaction); // Update transaction
router.delete("/:id", deleteTransaction); // Delete transaction
router.get("/category/:category", getTransactionsByCategory);
router.get("/average-spending", getAverageSpendingPerCategory);

export default router;
