import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
