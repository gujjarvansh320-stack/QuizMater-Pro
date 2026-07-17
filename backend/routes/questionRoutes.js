const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  addQuestion,
  getAllQuestions,
  getQuestionsByCategory,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// Add Question
router.post("/", protect, admin, addQuestion);

// Get All Questions
router.get("/", getAllQuestions);

// Get Questions by Category
router.get("/category/:categoryId", getQuestionsByCategory);

// Update Question
router.put("/:id", protect, admin, updateQuestion);

// Delete Question
router.delete("/:id", protect, admin, deleteQuestion);

module.exports = router;