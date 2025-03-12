import mongoose from "mongoose";

// Transaktionsmodell
const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

// Budgetmodell
const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
});

export const Budget = mongoose.model("Budget", budgetSchema);

// Investeringsmodell
const investmentSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  value: { type: Number, required: true }
});

export const Investment = mongoose.model("Investment", investmentSchema);
