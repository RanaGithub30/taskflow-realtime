import { apiPost, apiGet, apiDelete, apiPut, apiPatch } from "./api";

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

const deleteTask = async (taskId) => {
  const token = getAuthToken();
  const response = await apiDelete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateTask = async (taskId, data) => {
  const token = getAuthToken();
  const response = await apiPut(`/tasks/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateTaskDeadline = async (taskId, deadline) => {
  const token = getAuthToken();
  const response = await apiPatch(`/tasks/${taskId}/deadline`, { deadline }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getTaskDeadlineHistory = async () => {
  const token = getAuthToken();
  const response = await apiGet('/tasks/deadline-history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export { createTask, getAllTasks, deleteTask, updateTask, updateTaskDeadline, getTaskDeadlineHistory };
