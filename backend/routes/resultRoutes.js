const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  getMyResults,
  getResultById,
  getLeaderboard,
  getAllResults,
  deleteResult,
} = require("../controllers/resultController");

//my result api
router.get("/my-results", protect, getMyResults);

//leaderboard api
router.get("/leaderboard", getLeaderboard);

// Admin - Get All Results
router.get("/admin/all", protect, admin, getAllResults);

// Get Single Result
router.get("/:id", protect, getResultById);

//Delete Result
router.delete("/admin/:id", protect, admin, deleteResult);

module.exports = router;