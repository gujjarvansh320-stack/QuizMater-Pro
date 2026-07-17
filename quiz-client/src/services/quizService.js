import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/quiz`,
});

const getToken = () => localStorage.getItem("token");

// Start Quiz
export const startQuiz = async (categoryId) => {
  const { data } = await API.get(`/start/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Submit Quiz
export const submitQuiz = async (quizData) => {
  const { data } = await API.post("/submit", quizData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};