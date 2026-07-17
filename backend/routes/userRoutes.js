const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// Get All Users Route
router.get("/", protect, admin, getAllUsers);

//Delete Users Route
router.delete("/:id", protect, admin, deleteUser);

//Update User Route
router.put("/:id", protect, admin, updateUser);

module.exports = router;