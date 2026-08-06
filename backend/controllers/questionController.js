// const Question = require("../models/Question");
// const pdfParseModule = require("pdf-parse");
// const pdf = typeof pdfParseModule === "function" ? pdfParseModule : (pdfParseModule.default || pdfParseModule);

// //Add Questions
// const addQuestion = async (req, res) => {
//   try {

//     const {
//       question,
//       options,
//       correctAnswer,
//       category,
//       difficulty,
//       marks,
//     } = req.body;

//     if (
//       !question ||
//       !options ||
//       correctAnswer === undefined ||
//       !category
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     const newQuestion = await Question.create({
//       question,
//       options,
//       correctAnswer,
//       category,
//       difficulty,
//       marks,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Question Added Successfully",
//       question: newQuestion,
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });

//   }
// };


// // Get All Questions
// const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find()
//       .populate("category", "name")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: questions.length,
//       questions,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Get Questions By Category
// const getQuestionsByCategory = async (req, res) => {

//     try {

//         const questions = await Question.find({
//             category: req.params.categoryId
//         }).populate("category","name");

//         res.status(200).json({
//             success:true,
//             count:questions.length,
//             questions
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             success:false,
//             message:"Server Error"
//         });

//     }

// };

// // Update Question
// const updateQuestion = async (req, res) => {
//   try {

//     const updatedQuestion = await Question.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedQuestion) {
//       return res.status(404).json({
//         success: false,
//         message: "Question not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Question Updated Successfully",
//       question: updatedQuestion,
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });

//   }
// };

// // Delete Question
// const deleteQuestion = async (req, res) => {

//   try {

//     const question = await Question.findById(req.params.id);

//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         message: "Question not found",
//       });
//     }

//     await question.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Question Deleted Successfully",
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });

//   }

// };

// // Upload Questions via PDF
// const uploadPDFQuestions = async (req, res) => {
//   try {
//     // 1. Check if a file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     // 2. Grab the category that the admin selected from the frontend
//     const { category, difficulty, marks } = req.body;
    
//     if (!category) {
//       return res.status(400).json({ success: false, message: "A category is required for these questions." });
//     }

//     // 3. Read the PDF text
//     // const data = await pdfParse(req.file.buffer);
//     const data = await pdf(req.file.buffer);
//     const text = data.text;

//     // 4. Split and parse the text
//     const rawQuestions = text.split(/Q:/).filter(q => q.trim() !== "");
//     const parsedQuestions = [];

//     for (let block of rawQuestions) {
//       const answerMatch = block.match(/Answer:\s*([A-D])/i);
//       if (!answerMatch) continue; 
//       const answerLetter = answerMatch[1].toUpperCase();

//       const options = [];
//       const optA = block.match(/A\)(.*?)(?=B\)|$)/s);
//       const optB = block.match(/B\)(.*?)(?=C\)|$)/s);
//       const optC = block.match(/C\)(.*?)(?=D\)|$)/s);
//       const optD = block.match(/D\)(.*?)(?=Answer:|$)/s);

//       if (optA) options.push(optA[1].trim());
//       if (optB) options.push(optB[1].trim());
//       if (optC) options.push(optC[1].trim());
//       if (optD) options.push(optD[1].trim());

//       const questionText = block.split("A)")[0].trim();

//       // Convert the Answer letter (A/B/C/D) to the correct array index (0/1/2/3)
//       let correctOptionIndex = -1;
//       if (answerLetter === "A") correctOptionIndex = 0;
//       if (answerLetter === "B") correctOptionIndex = 1;
//       if (answerLetter === "C") correctOptionIndex = 2;
//       if (answerLetter === "D") correctOptionIndex = 3;

//       // Ensure we have a valid question, 4 options, and a valid correct answer index
//       if (questionText && options.length === 4 && correctOptionIndex !== -1) {
//         parsedQuestions.push({
//           question: questionText,
//           options: options,
//           correctAnswer: correctOptionIndex, // Now saving as a Number (0, 1, 2, or 3)!
//           category: category,
//           difficulty: difficulty || "medium",
//           marks: marks || 1
//         });
//       }
//     }

//     // 5. Save everything to MongoDB
//     if (parsedQuestions.length === 0) {
//       return res.status(400).json({ success: false, message: "Could not find properly formatted questions." });
//     }

//     await Question.insertMany(parsedQuestions);
    
//     res.status(201).json({ 
//       success: true, 
//       message: `Successfully uploaded ${parsedQuestions.length} questions!` 
//     });

//   } catch (error) {
//     console.error("PDF Upload Error:", error);
//     res.status(500).json({ success: false, message: "Server error while processing PDF" });
//   }
// };

// module.exports = {
//   addQuestion,
//   getAllQuestions,
//   getQuestionsByCategory,
//   updateQuestion,
//   deleteQuestion,
//   uploadPDFQuestions, // Add this line!
// };




const Question = require("../models/Question");
const pdfParseModule = require("pdf-parse"); 

// Add Questions
const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, category, difficulty, marks } = req.body;

    if (!question || !options || correctAnswer === undefined || !category) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const newQuestion = await Question.create({
      question, options, correctAnswer, category, difficulty, marks,
    });

    res.status(201).json({ success: true, message: "Question Added Successfully", question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("category", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Questions By Category
const getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.categoryId }).populate("category", "name");
    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Question
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedQuestion) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, message: "Question Updated Successfully", question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    await question.deleteOne();
    res.status(200).json({ success: true, message: "Question Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Upload Questions via PDF
const uploadPDFQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // 👉 SAFE CONSOLE.LOG TO INSPECT MULTER
    console.log("FILE OBJECT RECEIVED:", req.file);

    const { category, difficulty, marks } = req.body;
    if (!category) {
      return res.status(400).json({ success: false, message: "A category is required for these questions." });
    }

    // --- PDF IMPORT SAFEGUARD ---
    let extractPDFText;
    if (typeof pdfParseModule === "function") {
      extractPDFText = pdfParseModule; 
    } else if (pdfParseModule && typeof pdfParseModule.default === "function") {
      extractPDFText = pdfParseModule.default; 
    } else {
      console.error("PDF Library Failed to Load. It returned:", pdfParseModule);
      return res.status(500).json({ success: false, message: "Server configuration error with PDF parser." });
    }

    // 3. Read the PDF text
    const data = await extractPDFText(req.file.buffer);
    const text = data.text;

    // 4. Split and parse the text (UPDATED REGEX TO SUPPORT Q1., Q2., etc.)
    const rawQuestions = text.split(/Q\d*[:.]/).filter(q => q.trim() !== "");
    const parsedQuestions = [];

    for (let block of rawQuestions) {
      const answerMatch = block.match(/Answer:\s*([A-D])/i);
      if (!answerMatch) continue; 
      const answerLetter = answerMatch[1].toUpperCase();

      const options = [];
      const optA = block.match(/A\)(.*?)(?=B\)|$)/s);
      const optB = block.match(/B\)(.*?)(?=C\)|$)/s);
      const optC = block.match(/C\)(.*?)(?=D\)|$)/s);
      const optD = block.match(/D\)(.*?)(?=Answer:|$)/s);

      if (optA) options.push(optA[1].trim());
      if (optB) options.push(optB[1].trim());
      if (optC) options.push(optC[1].trim());
      if (optD) options.push(optD[1].trim());

      const questionText = block.split("A)")[0].trim();

      // Convert A/B/C/D to 0/1/2/3
      let correctOptionIndex = -1;
      if (answerLetter === "A") correctOptionIndex = 0;
      if (answerLetter === "B") correctOptionIndex = 1;
      if (answerLetter === "C") correctOptionIndex = 2;
      if (answerLetter === "D") correctOptionIndex = 3;

      if (questionText && options.length === 4 && correctOptionIndex !== -1) {
        parsedQuestions.push({
          question: questionText,
          options: options,
          correctAnswer: correctOptionIndex,
          category: category,
          difficulty: difficulty || "medium",
          marks: marks || 1
        });
      }
    }

    if (parsedQuestions.length === 0) {
      return res.status(400).json({ success: false, message: "Could not find properly formatted questions in the PDF." });
    }

    await Question.insertMany(parsedQuestions);
    
    res.status(201).json({ success: true, message: `Successfully uploaded ${parsedQuestions.length} questions!` });

  } catch (error) {
    console.error("PDF Upload Error:", error);
    res.status(500).json({ success: false, message: "Server error while processing PDF" });
  }
};

module.exports = {
  addQuestion, 
  getAllQuestions, 
  getQuestionsByCategory, 
  updateQuestion, 
  deleteQuestion, 
  uploadPDFQuestions,
};