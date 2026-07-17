const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addRating,
  getCategoryRating,
  getMyRating,
} = require("../controllers/ratingController");

router.post("/", protect, addRating);

router.get("/category/:categoryId", getCategoryRating);

router.get("/my/:resultId", protect, getMyRating);

module.exports = router;