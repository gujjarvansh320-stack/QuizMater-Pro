import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/questions",
});

// Get Token
const getToken = () => localStorage.getItem("token");

// ==============================
// Get All Questions
// ==============================
export const getQuestions = async () => {
  const { data } = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// ==============================
// Add Question
// ==============================
export const createQuestion = async (question) => {
  const { data } = await API.post("/", question, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// ==============================
// Update Question
// ==============================
export const updateQuestion = async (id, question) => {
  const { data } = await API.put(`/${id}`, question, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// ==============================
// Delete Question
// ==============================
export const deleteQuestion = async (id) => {
  const { data } = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};