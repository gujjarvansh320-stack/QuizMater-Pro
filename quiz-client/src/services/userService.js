import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/users`,
});

const getToken = () => localStorage.getItem("token");

// Get All Users
export const getUsers = async () => {
  const { data } = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Update User
export const updateUser = async (id, user) => {
  const { data } = await API.put(`/${id}`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

// Delete User
export const deleteUser = async (id) => {
  const { data } = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};