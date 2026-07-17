const Rating = require("../models/Rating");

// =====================================
// Add Rating
// =====================================
const addRating = async (req, res) => {
  try {
    const { resultId, categoryId, rating } = req.body;

    // Validation
    if (!resultId || !categoryId || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Rating must be between 1 and 5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if already rated
    const existingRating = await Rating.findOne({
      user: req.user.id,
      result: resultId,
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this quiz.",
      });
    }

    // Save Rating
    const newRating = await Rating.create({
      user: req.user.id,
      result: resultId,
      category: categoryId,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Average Rating of Category
// =====================================
const getCategoryRating = async (req, res) => {
  try {
    const ratings = await Rating.find({
      category: req.params.categoryId,
    });

    if (ratings.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
        totalRatings: 0,
      });
    }

    const total = ratings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const average = Number(
      (total / ratings.length).toFixed(1)
    );

    res.status(200).json({
      success: true,
      averageRating: average,
      totalRatings: ratings.length,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get My Rating
// =====================================
const getMyRating = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      user: req.user.id,
      result: req.params.resultId,
    });

    res.status(200).json({
      success: true,
      rating,
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
  addRating,
  getCategoryRating,
  getMyRating,
};