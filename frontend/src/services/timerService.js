import { apiPatch, apiPost } from "./api";

const startTaskTimer = async (taskId) => {
  const response = await apiPost(`/tasks/${taskId}/time-entries`);
  return response.data;
};

const stopTaskTimer = async (entryId) => {
  const response = await apiPatch(`/time-entries/${entryId}/stop`);
  return response.data;
};

export { startTaskTimer, stopTaskTimer };