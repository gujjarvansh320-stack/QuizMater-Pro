// import { useCallback, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { startQuiz, submitQuiz } from "../services/quizService";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Quiz = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Fetch user context for the JWT token

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const fetchQuestions = useCallback(async () => {
//     try {
//       const data = await startQuiz(categoryId);
//       setQuestions(data.questions);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load quiz");
//     } finally {
//       setLoading(false);
//     }
//   }, [categoryId]);

//   useEffect(() => {
//     fetchQuestions();
//   }, [fetchQuestions]);

//   const handleAnswer = (optionIndex) => {
//     const updatedAnswers = [...answers];

//     const existing = updatedAnswers.find(
//       (a) => a.questionId === questions[currentQuestion]._id
//     );

//     if (existing) {
//       existing.selectedOption = optionIndex;
//     } else {
//       updatedAnswers.push({
//         questionId: questions[currentQuestion]._id,
//         selectedOption: optionIndex,
//       });
//     }

//     setAnswers(updatedAnswers);
//   };

//   const selectedAnswer = answers.find(
//     (a) => a.questionId === questions[currentQuestion]?._id
//   );

//   const handleSubmit = async () => {
//     try {
//       // 1. Submit answers to your existing evaluation service
//       const data = await submitQuiz({
//         categoryId,
//         answers,
//       });

//       // 2. Capture the evaluated data and explicitly save it to MongoDB
//       const token = user?.token || localStorage.getItem("token");
//       let finalResultId = data.result._id;

//       if (token) {
//         const saveRes = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/api/results/save`,
//           {
//             category: categoryId,
//             score: data.result.score,             // Evaluated score
//             percentage: data.result.percentage,   // Evaluated percentage
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
        
//         // Use the ID of the freshly saved database document
//         finalResultId = saveRes.data.result._id;
//       }

//       // 3. Navigate to the result page using the verified database ID
//       navigate(`/result/${finalResultId}`);
//     } catch (error) {
//       console.log(error);
//       alert("Quiz submission failed");
//     }
//   };

//   if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

//   if (questions.length === 0)
//     return <h2 className="text-center mt-5">No Questions Found</h2>;

//   const question = questions[currentQuestion];

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">
//         Question {currentQuestion + 1} / {questions.length}
//       </h2>

//       <div className="card shadow p-4">
//         <h4 className="mb-4">{question.question}</h4>

//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             className={`btn mb-3 w-100 ${
//               selectedAnswer?.selectedOption === index
//                 ? "btn-primary"
//                 : "btn-outline-primary"
//             }`}
//             onClick={() => handleAnswer(index)}
//           >
//             {option}
//           </button>
//         ))}

//         <div className="d-flex justify-content-between mt-4">
//           <button
//             className="btn btn-secondary"
//             disabled={currentQuestion === 0}
//             onClick={() => setCurrentQuestion(currentQuestion - 1)}
//           >
//             Previous
//           </button>

//           {currentQuestion === questions.length - 1 ? (
//             <button className="btn btn-success" onClick={handleSubmit}>
//               Submit Quiz
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary"
//               onClick={() => setCurrentQuestion(currentQuestion + 1)}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;



// import { useCallback, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { startQuiz, submitQuiz } from "../services/quizService";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Quiz = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Fetch user context for the JWT token

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const fetchQuestions = useCallback(async () => {
//     try {
//       const data = await startQuiz(categoryId);
//       setQuestions(data.questions);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load quiz");
//     } finally {
//       setLoading(false);
//     }
//   }, [categoryId]);

//   useEffect(() => {
//     fetchQuestions();
//   }, [fetchQuestions]);

//   const handleAnswer = (optionIndex) => {
//     const updatedAnswers = [...answers];

//     const existing = updatedAnswers.find(
//       (a) => a.questionId === questions[currentQuestion]._id
//     );

//     if (existing) {
//       existing.selectedOption = optionIndex;
//     } else {
//       updatedAnswers.push({
//         questionId: questions[currentQuestion]._id,
//         selectedOption: optionIndex,
//       });
//     }

//     setAnswers(updatedAnswers);
//   };

//   const selectedAnswer = answers.find(
//     (a) => a.questionId === questions[currentQuestion]?._id
//   );

//   const handleSubmit = async () => {
//     try {
//       // 1. Submit answers to your existing evaluation service
//       const data = await submitQuiz({
//         categoryId,
//         answers,
//       });

//       // 2. Capture the evaluated data and explicitly save it to MongoDB
//       const token = user?.token || localStorage.getItem("token");
//       let finalResultId = data.result._id;

//       if (token) {
//         const saveRes = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/api/results/save`,
//           {
//             category: categoryId,
//             score: data.result.score,             
//             percentage: data.result.percentage,   
//             // Include missing fields required by the Result schema
//             totalQuestions: questions.length,
//             correctAnswers: data.result.correctAnswers || 0,
//             wrongAnswers: data.result.wrongAnswers || 0,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
        
//         // Use the ID of the freshly saved database document
//         finalResultId = saveRes.data.result._id;
//       }

//       // 3. Navigate to the result page using the verified database ID
//       navigate(`/result/${finalResultId}`);
//     } catch (error) {
//       console.error(error);
//       alert("Quiz submission failed");
//     }
//   };

//   if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

//   if (questions.length === 0)
//     return <h2 className="text-center mt-5">No Questions Found</h2>;

//   const question = questions[currentQuestion];

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">
//         Question {currentQuestion + 1} / {questions.length}
//       </h2>

//       <div className="card shadow p-4">
//         <h4 className="mb-4">{question.question}</h4>

//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             className={`btn mb-3 w-100 ${
//               selectedAnswer?.selectedOption === index
//                 ? "btn-primary"
//                 : "btn-outline-primary"
//             }`}
//             onClick={() => handleAnswer(index)}
//           >
//             {option}
//           </button>
//         ))}

//         <div className="d-flex justify-content-between mt-4">
//           <button
//             className="btn btn-secondary"
//             disabled={currentQuestion === 0}
//             onClick={() => setCurrentQuestion(currentQuestion - 1)}
//           >
//             Previous
//           </button>

//           {currentQuestion === questions.length - 1 ? (
//             <button className="btn btn-success" onClick={handleSubmit}>
//               Submit Quiz
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary"
//               onClick={() => setCurrentQuestion(currentQuestion + 1)}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;




// import { useCallback, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { startQuiz, submitQuiz } from "../services/quizService";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Quiz = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Fetch user context for the JWT token

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const fetchQuestions = useCallback(async () => {
//     try {
//       const data = await startQuiz(categoryId);
//       setQuestions(data.questions);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load quiz");
//     } finally {
//       setLoading(false);
//     }
//   }, [categoryId]);

//   useEffect(() => {
//     fetchQuestions();
//   }, [fetchQuestions]);

//   const handleAnswer = (optionIndex) => {
//     const updatedAnswers = [...answers];

//     const existing = updatedAnswers.find(
//       (a) => a.questionId === questions[currentQuestion]._id
//     );

//     if (existing) {
//       existing.selectedOption = optionIndex;
//     } else {
//       updatedAnswers.push({
//         questionId: questions[currentQuestion]._id,
//         selectedOption: optionIndex,
//       });
//     }

//     setAnswers(updatedAnswers);
//   };

//   const selectedAnswer = answers.find(
//     (a) => a.questionId === questions[currentQuestion]?._id
//   );

//   const handleSubmit = async () => {
//     try {
//       console.log("STEP 1: Sending answers to your original submit service...");
//       const data = await submitQuiz({
//         categoryId,
//         answers,
//       });
//       console.log("STEP 2: Evaluation complete! Data received:", data);

//       const token = user?.token || localStorage.getItem("token");
//       let finalResultId = data.result?._id;

//       if (token) {
//         console.log("STEP 3: Sending data to the new /save API...");
        
//         const savePayload = {
//           category: categoryId,
//           score: data.result?.score || 0,             
//           percentage: data.result?.percentage || 0,   
//           totalQuestions: questions.length,
//           correctAnswers: data.result?.correctAnswers || 0,
//           wrongAnswers: data.result?.wrongAnswers || 0,
//         };
//         console.log("Payload being sent:", savePayload);

//         const saveRes = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/api/results/save`,
//           savePayload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
        
//         console.log("STEP 4: Successfully saved! Backend response:", saveRes.data);
//         finalResultId = saveRes.data.result._id;
//       }

//       console.log("STEP 5: Redirecting to results page...");
//       navigate(`/result/${finalResultId}`);
      
//     } catch (error) {
//       console.error("🔴 ERROR CAUGHT!");
//       console.error("Error Details:", error);
//       console.error("Backend Error Message:", error.response?.data);
//       alert(`Submission Error: Please check the console (F12)`);
//     }
//   };

//   if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

//   if (questions.length === 0)
//     return <h2 className="text-center mt-5">No Questions Found</h2>;

//   const question = questions[currentQuestion];

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">
//         Question {currentQuestion + 1} / {questions.length}
//       </h2>

//       <div className="card shadow p-4">
//         <h4 className="mb-4">{question.question}</h4>

//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             className={`btn mb-3 w-100 ${
//               selectedAnswer?.selectedOption === index
//                 ? "btn-primary"
//                 : "btn-outline-primary"
//             }`}
//             onClick={() => handleAnswer(index)}
//           >
//             {option}
//           </button>
//         ))}

//         <div className="d-flex justify-content-between mt-4">
//           <button
//             className="btn btn-secondary"
//             disabled={currentQuestion === 0}
//             onClick={() => setCurrentQuestion(currentQuestion - 1)}
//           >
//             Previous
//           </button>

//           {currentQuestion === questions.length - 1 ? (
//             <button className="btn btn-success" onClick={handleSubmit}>
//               Submit Quiz
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary"
//               onClick={() => setCurrentQuestion(currentQuestion + 1)}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;



import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startQuiz, submitQuiz } from "../services/quizService";

const Quiz = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await startQuiz(categoryId);
      setQuestions(data.questions);
    } catch (error) {
      console.error(error);
      alert("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (optionIndex) => {
    const updatedAnswers = [...answers];

    const existing = updatedAnswers.find(
      (a) => a.questionId === questions[currentQuestion]._id
    );

    if (existing) {
      existing.selectedOption = optionIndex;
    } else {
      updatedAnswers.push({
        questionId: questions[currentQuestion]._id,
        selectedOption: optionIndex,
      });
    }

    setAnswers(updatedAnswers);
  };

  const selectedAnswer = answers.find(
    (a) => a.questionId === questions[currentQuestion]?._id
  );

  const handleSubmit = async () => {
    try {
      // One single, clean call to your backend!
      const data = await submitQuiz({
        categoryId,
        answers,
      });

      // Redirect immediately to the new result document
      navigate(`/result/${data.result._id}`);
    } catch (error) {
      console.error(error);
      alert("Quiz submission failed");
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  if (questions.length === 0)
    return <h2 className="text-center mt-5">No Questions Found</h2>;

  const question = questions[currentQuestion];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">
        Question {currentQuestion + 1} / {questions.length}
      </h2>

      <div className="card shadow p-4">
        <h4 className="mb-4">{question.question}</h4>

        {question.options.map((option, index) => (
          <button
            key={index}
            className={`btn mb-3 w-100 ${
              selectedAnswer?.selectedOption === index
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => handleAnswer(index)}
          >
            {option}
          </button>
        ))}

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit Quiz
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;