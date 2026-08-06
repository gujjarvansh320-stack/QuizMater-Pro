// const express = require("express");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");

// const {
//   addQuestion,
//   getAllQuestions,
//   getQuestionsByCategory,
//   updateQuestion,
//   deleteQuestion,
// } = require("../controllers/questionController");

// // Add Question
// router.post("/", protect, admin, addQuestion);

// // Get All Questions
// router.get("/", getAllQuestions);

// // Get Questions by Category
// router.get("/category/:categoryId", getQuestionsByCategory);

// // Update Question
// router.put("/:id", protect, admin, updateQuestion);

// // Delete Question
// router.delete("/:id", protect, admin, deleteQuestion);

// module.exports = router;




const express = require("express");
const router = express.Router();
const multer = require("multer"); // 1. Import multer for file handling

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  addQuestion,
  getAllQuestions,
  getQuestionsByCategory,
  updateQuestion,
  deleteQuestion,
  uploadPDFQuestions, // 2. Import the new controller function
} = require("../controllers/questionController");

// 3. Configure Multer to temporarily store the uploaded file in server memory
const upload = multer({ storage: multer.memoryStorage() });

// --- ROUTES ---

// Bulk Upload Questions via PDF (Must be an admin, expects a file named 'pdfFile')
router.post("/upload-pdf", protect, admin, upload.single("pdfFile"), uploadPDFQuestions);

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