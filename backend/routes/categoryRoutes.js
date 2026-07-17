const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

// Create Category Route
router.post("/", protect, createCategory);

// Get All Categories Route
router.get("/", getAllCategories);

//Delete Category Route
router.delete("/:id", protect, deleteCategory);

//Update Category Route
router.put("/:id", protect, updateCategory);

// Export Router
module.exports = router;