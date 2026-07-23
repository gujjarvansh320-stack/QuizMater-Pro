const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const User = require("../models/User");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

// Load Environment Variables
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({
  origin:[
    "http://localhost:3000",
    "https://quiz-master-pro-azure.vercel.app",
  ],
  credentials:true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("QuizMaster Backend API is Running...");
});

//Auth Route
app.use("/api/auth", authRoutes);

//Categories Route
app.use("/api/categories", categoryRoutes);

//Questions Route
app.use("/api/questions", questionRoutes);

//Quiz Route
app.use("/api/quiz", quizRoutes);

// Default Route

//Results Route
app.use("/api/results", resultRoutes);

//User Route
app.use("/api/users", userRoutes);

//Admin Dashboard Route
app.use("/api/admin", adminRoutes);

//Rating Route
app.use("/api/ratings", ratingRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

//Test Route
app.use("/api/test", testRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});