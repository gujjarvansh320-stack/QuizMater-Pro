const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  startQuiz,submitQuiz
} = require("../controllers/quizController");

//
router.get("/start/:categoryId", protect, startQuiz);

//submit quiz api
router.post("/submit", protect, submitQuiz);

module.exports = router;