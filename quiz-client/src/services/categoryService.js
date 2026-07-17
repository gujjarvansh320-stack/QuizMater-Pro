import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/categories`,
});

// Token
const getToken = () => localStorage.getItem("token");

// Get All Categories
export const getCategories = async () => {
  const { data } = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Add Category
export const createCategory = async (category) => {
  const { data } = await API.post("/", category, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Update Category
export const updateCategory = async (id, category) => {
  const { data } = await API.put(`/${id}`, category, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};