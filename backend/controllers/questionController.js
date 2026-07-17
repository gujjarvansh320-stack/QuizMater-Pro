const Question = require("../models/Question");

//Add Questions
const addQuestion = async (req, res) => {
  try {

    const {
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      marks,
    } = req.body;

    if (
      !question ||
      !options ||
      correctAnswer === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      marks,
    });

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      question: newQuestion,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// Get All Questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Questions By Category
const getQuestionsByCategory = async (req, res) => {

    try {

        const questions = await Question.find({
            category: req.params.categoryId
        }).populate("category","name");

        res.status(200).json({
            success:true,
            count:questions.length,
            questions
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });

    }

};

// Update Question
const updateQuestion = async (req, res) => {
  try {

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question Updated Successfully",
      question: updatedQuestion,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Delete Question
const deleteQuestion = async (req, res) => {

  try {

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: "Question Deleted Successfully",
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
  addQuestion,
  getAllQuestions,
  getQuestionsByCategory,
  updateQuestion,
  deleteQuestion,
};