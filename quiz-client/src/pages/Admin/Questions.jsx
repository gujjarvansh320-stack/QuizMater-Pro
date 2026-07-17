import { useEffect, useState } from "react";
import {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../services/questionService";
import { getCategories } from "../../services/categoryService";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
    difficulty: "easy",
    marks: 1,
  });

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;

    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = {
        ...formData,
        correctAnswer: Number(formData.correctAnswer),
        marks: Number(formData.marks),
      };

      if (editingId) {
        await updateQuestion(editingId, questionData);

        alert("Question Updated Successfully");
      } else {
        await createQuestion(questionData);

        alert("Question Added Successfully");
      }

      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        category: "",
        difficulty: "easy",
        marks: 1,
      });

      setEditingId(null);

      fetchQuestions();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  //Delete Questions
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmDelete) return;

    try {
      await deleteQuestion(id);

      alert("Question Deleted Successfully");

      fetchQuestions();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  //Edit
  const handleEdit = (question) => {
    setEditingId(question._id);

    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      category: question.category._id,
      difficulty: question.difficulty,
      marks: question.marks,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Manage Questions</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label">Question</label>

          <input
            type="text"
            className="form-control"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          {formData.options.map((option, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label className="form-label">
                Option {String.fromCharCode(65 + index)}
              </label>

              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Correct Answer</label>

            <select
              className="form-select"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
            >
              <option value={0}>Option A</option>
              <option value={1}>Option B</option>
              <option value={2}>Option C</option>
              <option value={3}>Option D</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Category</label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <label>Difficulty</label>

            <select
              className="form-select"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <label>Marks</label>

            <input
              type="number"
              className="form-control"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>
        <button className="btn btn-primary">
          {editingId ? "Update Question" : "Add Question"}
        </button>{" "}
      </form>

      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Category</th>
              <th>Answer</th>
              <th>Difficulty</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Questions Found
                </td>
              </tr>
            ) : (
              questions.map((q, index) => (
                <tr key={q._id}>
                  <td>{index + 1}</td>

                  <td>{q.question}</td>

                  <td>{q.category?.name}</td>

                  <td>{q.options[q.correctAnswer]}</td>

                  <td>{q.difficulty}</td>

                  <td>{q.marks}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Questions;
