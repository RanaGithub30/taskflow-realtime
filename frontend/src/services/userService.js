import { apiPost } from "./api";

export const createUser = async (data) => {
  const response = await apiPost("/register", data);
  return response.data;
};