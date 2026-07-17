const User = require("../models/User");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Result = require("../models/Result");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalResults = await Result.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
      totalCategories,
      totalQuestions,
      totalResults,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};