import { apiPost, apiGet } from "./api";

const getAuthToken = () => localStorage.getItem("access_token") || localStorage.getItem("authToken");

const createTask = async (data) => {
  const token = getAuthToken();
  const response = await apiPost("/tasks", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getAllTasks = async () => {
  const token = getAuthToken();
  const response = await apiGet("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export { createTask, getAllTasks };
