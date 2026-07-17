import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ratings",
});

const getToken = () => localStorage.getItem("token");

// Add Rating
export const addRating = async (ratingData) => {
  const { data } = await API.post("/", ratingData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Get Category Average Rating
export const getCategoryRating = async (categoryId) => {
  const { data } = await API.get(`/category/${categoryId}`);

  return data;
};

// Get My Rating
export const getMyRating = async (resultId) => {
  const { data } = await API.get(`/my/${resultId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};