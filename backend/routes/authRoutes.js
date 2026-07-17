const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

//Login Route
router.post("/login", loginUser);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

//Reset Password Route
router.post("/reset-password/:token", resetPassword);

//Profile Route
router.get("/profile", protect, getProfile);

//verify email Route
router.get("/verify-email/:token", verifyEmail);

module.exports = router;