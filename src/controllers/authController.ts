import { Request, Response } from "express";
import crypto from "crypto"; // To generate API keys
import User from "../models/userModel";

// Register User & Generate API Key
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, email } = req.body;
  
      if (!username || !password || !email) {
        res.status(400).json({ message: "Username, email, and password are required" });
        return;
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "Email already taken" });
        return;
      }
  
      const apiKey = crypto.randomBytes(32).toString("hex");
  
      const newUser = new User({ username, password, email, apiKey });
      await newUser.save();
  
      res.status(201).json({ message: "User registered", apiKey });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Failed to register" });
    }
  };
  

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({ message: "Login successful", apiKey: user.apiKey });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Logout User
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { apiKey: req.header("Authorization") }, // Use API key instead of token
      { apiKey: "" },
      { new: true }
    );

    if (!user) {
      res.status(400).json({ message: "Invalid API key" });
      return;
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

// Get User
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ apiKey: req.header("Authorization") });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
