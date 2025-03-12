import { Request, Response } from "express";
import Budget from "../models/budgetModel";

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};
