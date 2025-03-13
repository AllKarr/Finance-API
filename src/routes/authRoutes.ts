import express from "express";
import { registerUser, loginUser, logoutUser, getUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // Register & get token
router.post("/login", loginUser); // Login & get token
router.post("/logout", logoutUser); // Logout & invalidate token
router.get("/me", getUser); // Get user details

export default router;
