import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard`;

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};