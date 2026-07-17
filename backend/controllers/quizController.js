const Question = require("../models/Question");
const Result = require("../models/Result");

// Start Quiz

// const startQuiz = async (req, res) => {
//   try {

const startQuiz = async (req, res) => {
  try {

    let questions = await Question.find({
      category: req.params.categoryId,
    }).select("-correctAnswer");

    // Shuffle Questions Only
    questions = questions.sort(() => Math.random() - 0.5);

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this category",
      });
    }

    res.status(200).json({
      success: true,
      totalQuestions: questions.length,
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

// Submit Quiz
const submitQuiz = async (req, res) => {
  try {

    const { categoryId, answers } = req.body;

    const questions = await Question.find({
      category: categoryId,
    });

    let correct = 0;
    let wrong = 0;
    let score = 0;

    questions.forEach((question) => {

      const userAnswer = answers.find(
        (ans) => ans.questionId == question._id.toString()
      );

      if (!userAnswer) {
        wrong++;
        return;
      }

      if (userAnswer.selectedOption === question.correctAnswer) {
        correct++;
        score += question.marks;
      } else {
        wrong++;
      }

    });

    const percentage = Number(
      ((correct / questions.length) * 100).toFixed(2)
    );

    const result = await Result.create({
      user: req.user.id,
      category: categoryId,
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      percentage,
    });

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

module.exports = {
  startQuiz, submitQuiz
};