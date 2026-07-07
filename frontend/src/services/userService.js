import { apiPost, apiGet, setAuthToken } from "./api";

const createUser = async (data) => {
  const response = await apiPost("/register", data);
  return response.data;
};

const loginUser = async (data) => {
  const response = await apiPost("/login", data);
  const token = response?.data?.data?.access_token;

  if (token) {
    setAuthToken(token);
  }

  return response.data;
};

const getUserDetails = async () => {
  const response = await apiGet("/auth/user");
  return response?.data?.data ?? response?.data?.user ?? response?.data ?? null;
};

export { createUser, loginUser, getUserDetails };