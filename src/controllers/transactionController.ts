import { Request, Response } from "express";
import Transaction from "../models/transactionModel";

// Get all transactions
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a transaction by ID
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
};

// Create a transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};
