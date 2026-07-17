const Result = require("../models/Result");
// const Result = require("../models/Result");

// Get Logged-in User Results
const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Result
const getResultById = async (req, res) => {
  try {

    const result = await Result.findById(req.params.id)
      .populate("category", "name")
      .populate("user", "name email");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Leaderboard
const getLeaderboard = async (req, res) => {

  try {

    const leaderboard = await Result.find()
      .populate("user", "name")
      .sort({
        score: -1,
        percentage: -1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Admin - Get All Results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("user", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Delete Result
const deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    await result.deleteOne();

    res.status(200).json({
      success: true,
      message: "Result Deleted Successfully",
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
  getMyResults,
  getResultById,
  getLeaderboard,
  getAllResults,
  deleteResult,
};