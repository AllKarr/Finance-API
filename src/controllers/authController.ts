import { Request, Response } from "express";
import User from "../models/userModel";

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const token = Math.random().toString(36).substr(2);
    const user = new User({ username, password, token });
    await user.save();

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    res.json({ token: user.token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Logout User
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { token: req.header("Authorization") },
      { token: "" },
      { new: true }
    );

    if (!user) {
      res.status(400).json({ message: "Invalid token" });
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
    const user = await User.findOne({ token: req.header("Authorization") });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
