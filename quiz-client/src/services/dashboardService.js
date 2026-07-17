import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/dashboard";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};