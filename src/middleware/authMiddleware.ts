import { Request, Response, NextFunction } from "express";
import User from "../models/userModel"; // Import User model
import mongoose from "mongoose";

// Define an interface for the authenticated request
interface AuthRequest extends Request {
  user?: mongoose.Document & { username: string; apiKey: string; loggedOut: boolean };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.header("Authorization")?.replace("Bearer ", "");

    if (!apiKey) {
      return res.status(401).json({ message: "No API key provided" });
    }

    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    if (user.loggedOut) { // Prevent logged-out users from accessing routes
      return res.status(403).json({ message: "User is logged out. Please log in again." });
    }

    req.user = user as mongoose.Document & { username: string; apiKey: string; loggedOut: boolean }; // Attach user
    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" });
  }
};
