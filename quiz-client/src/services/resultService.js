import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/results`,
});

const getToken = () => localStorage.getItem("token");

// ======================
// Get Single Result
// ======================
export const getResultById = async (id) => {
  const { data } = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// ======================
// Admin - Get All Results
// ======================
export const getAllResults = async () => {
  const { data } = await API.get("/admin/all", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// ======================
// Leaderboard
// ======================
export const getLeaderboard = async () => {
  const { data } = await API.get("/leaderboard");

  return data;
};

// ======================
// Admin - Delete Result
// ======================
export const deleteResult = async (id) => {
  const { data } = await API.delete(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};