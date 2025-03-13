import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String } // Store a session token
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
