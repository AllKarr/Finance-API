import express from "express";
import {
  getBudgets,
  createBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController";

const router = express.Router();

// CRUD routes for budgets
router.get("/", getBudgets); // Get all budgets
router.post("/", createBudget); // Create a budget
router.get("/:id", getBudgetById); // Get budget by ID
router.put("/:id", updateBudget); // Update budget
router.delete("/:id", deleteBudget); // Delete budget

export default router;
