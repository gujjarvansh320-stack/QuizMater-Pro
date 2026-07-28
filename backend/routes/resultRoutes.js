// const express = require("express");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const admin = require("../middleware/adminMiddleware");

// const {
//   getMyResults,
//   getResultById,
//   getLeaderboard,
//   getAllResults,
//   deleteResult,
// } = require("../controllers/resultController");

// //my result api
// router.get("/my-results", protect, getMyResults);

// //leaderboard api
// router.get("/leaderboard", getLeaderboard);

// // Admin - Get All Results
// router.get("/admin/all", protect, admin, getAllResults);

// // Get Single Result
// router.get("/:id", protect, getResultById);

// //Delete Result
// router.delete("/admin/:id", protect, admin, deleteResult);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");

// const {
//   getMyResults,
//   saveResult, // NEW: Imported the save function
//   getResultById,
//   getLeaderboard,
//   getAllResults,
//   deleteResult,
// } = require("../controllers/resultController");

// // My result API
// router.get("/my-results", protect, getMyResults);

// // Leaderboard API
// router.get("/leaderboard", getLeaderboard);

// // Save Result API (Make sure this goes BEFORE the /:id route!)
// router.post("/save", protect, saveResult);

// // Admin - Get All Results
// router.get("/admin/all", protect, admin, getAllResults);

// // Get Single Result
// router.get("/:id", protect, getResultById);

// // Delete Result
// router.delete("/admin/:id", protect, admin, deleteResult);

// module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getMyResults,
  saveResult, // NEW: Imported the save function
  getResultById,
  getLeaderboard,
  getAllResults,
  deleteResult,
} = require("../controllers/resultController");

// My result API
router.get("/my-results", protect, getMyResults);

// Leaderboard API
router.get("/leaderboard", getLeaderboard);

// Save Result API (Make sure this goes BEFORE the /:id route!)
router.post("/save", protect, saveResult);

// Admin - Get All Results
router.get("/admin/all", protect, admin, getAllResults);

// Get Single Result
router.get("/:id", protect, getResultById);

// Delete Result
router.delete("/admin/:id", protect, admin, deleteResult);

module.exports = router;