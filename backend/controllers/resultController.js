// const Result = require("../models/Result");

// // Get Logged-in User Results
// const getMyResults = async (req, res) => {
//   try {
//     // FIXED: Changed req.user.id to req.user._id
//     const results = await Result.find({ user: req.user._id })
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: results.length,
//       results,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Save a New Quiz Result
// const saveResult = async (req, res) => {
//   try {
//     const { category, score, percentage } = req.body;

//     // Create and save the new result to MongoDB
//     const result = await Result.create({
//       user: req.user._id, // Gets the logged-in user's ID from the token
//       category,           // The category ID of the quiz
//       score,
//       percentage,
//     });

//     res.status(201).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error("Error saving result:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error: Could not save score",
//     });
//   }
// };

// // Get Single Result
// const getResultById = async (req, res) => {
//   try {
//     const result = await Result.findById(req.params.id)
//       .populate("category", "name")
//       .populate("user", "name email");

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Result Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Leaderboard
// const getLeaderboard = async (req, res) => {
//   try {
//     const { categoryId } = req.query; // Extract categoryId from the request URL

//     // Build the query filter
//     const queryFilter = {};
//     if (categoryId && categoryId !== "all") {
//       queryFilter.category = categoryId; // Filter by category if one is provided
//     }

//     // Pass the queryFilter into the find() method
//     const leaderboard = await Result.find(queryFilter)
//       .populate("user", "name")
//       .sort({
//         score: -1,
//         percentage: -1,
//       })
//       .limit(10);

//     res.status(200).json({
//       success: true,
//       leaderboard,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Admin - Get All Results
// const getAllResults = async (req, res) => {
//   try {
//     const results = await Result.find()
//       .populate("user", "name email")
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: results.length,
//       results,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Delete Result
// const deleteResult = async (req, res) => {
//   try {
//     const result = await Result.findById(req.params.id);

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Result Not Found",
//       });
//     }

//     await result.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Result Deleted Successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// module.exports = {
//   getMyResults,
//   saveResult,
//   getResultById,
//   getLeaderboard,
//   getAllResults,
//   deleteResult,
// };



const Result = require("../models/Result");

// Get Logged-in User Results
const getMyResults = async (req, res) => {
  try {
    // Uses req.user._id to match MongoDB's ID format
    const results = await Result.find({ user: req.user._id })
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

// Save a New Quiz Result
const saveResult = async (req, res) => {
  try {
    // Pull all required schema fields from the request body
    const { 
      category, 
      score, 
      percentage, 
      totalQuestions, 
      correctAnswers, 
      wrongAnswers 
    } = req.body;

    // Create and save the new result to MongoDB
    const result = await Result.create({
      user: req.user._id, // Gets the logged-in user's ID from the token
      category,           
      score,
      percentage,
      totalQuestions,     // Required field
      correctAnswers,     
      wrongAnswers,       
    });

    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not save score",
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
    const { categoryId } = req.query; // Extract categoryId from the request URL

    // Build the query filter
    const queryFilter = {};
    if (categoryId && categoryId !== "all") {
      queryFilter.category = categoryId; // Filter by category if one is provided
    }

    // Pass the queryFilter into the find() method
    const leaderboard = await Result.find(queryFilter)
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

// Delete Result
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
  saveResult,
  getResultById,
  getLeaderboard,
  getAllResults,
  deleteResult,
};