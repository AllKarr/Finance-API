import { Request, Response } from "express";
import crypto from "crypto"; // To generate API keys
import User from "../models/userModel";

// Register User & Generate API Key
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
  
      // Validate input
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
  
      // Generate API key
      const apiKey = crypto.randomBytes(32).toString("hex");
  
      // Create and save the new user
      const newUser = new User({ username, password, apiKey });
      await newUser.save();
  
      console.log("User registered successfully:", newUser);
  
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
