import { Request, Response } from "express";
import Budget from "../models/budgetModel";

// Get all budgets
export const getBudgets = async (req: Request, res: Response): Promise<void> => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a budget by ID
export const getBudgetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
};

// Create a budget
export const createBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update a budget
export const updateBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBudget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete a budget
export const deleteBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget" });
  }
};

// Get budgets by category
export const getBudgetsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;
      const budgets = await Budget.find({ category });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ message: "Error fetching budgets by category" });
    }
  };
  
  // Get monthly budget summary (per category)
  export const getMonthlyBudgetSummary = async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await Budget.aggregate([
        { 
          $group: { 
            _id: { month: { $month: "$createdAt" }, category: "$category" }, 
            totalBudget: { $sum: "$limit" } 
          } 
        },
        { $sort: { "_id.month": 1 } }
      ]);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Error generating budget summary" });
    }
  };