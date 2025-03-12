import express from "express";
import { Transaction, Budget, Investment } from "./models";

const router = express.Router();

// 🏦 TRANSAKTIONER
router.post("/transactions", async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.status(201).json(transaction);
});

router.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// 📊 BUDGETAR
router.post("/budgets", async (req, res) => {
  const budget = new Budget(req.body);
  await budget.save();
  res.status(201).json(budget);
});

router.get("/budgets", async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
});

// 📈 INVESTERINGAR
router.post("/investments", async (req, res) => {
  const investment = new Investment(req.body);
  await investment.save();
  res.status(201).json(investment);
});

router.get("/investments", async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
});

export default router;
