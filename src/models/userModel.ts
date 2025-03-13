import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String, unique: true, required: true } // New API Key field
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
