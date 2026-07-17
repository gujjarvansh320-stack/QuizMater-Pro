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
    console.log(error);
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
      (a) => a.questionId === questions[currentQuestion]._id,
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
    (a) => a.questionId === questions[currentQuestion]?._id,
  );

  const handleSubmit = async () => {
    try {
      const data = await submitQuiz({
        categoryId,
        answers,
      });

      //   navigate("/result", {
      //     state: {
      //       result: data.result,
      //     },
      //   });

      navigate(`/result/${data.result._id}`);
    } catch (error) {
      console.log(error);
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
