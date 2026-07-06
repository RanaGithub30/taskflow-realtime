import { apiPost } from "./api";

const createUser = async (data) => {
  const response = await apiPost("/register", data);
  return response.data;
};

const loginUser = async (data) => {
  const response = await apiPost("/login", data);
  return response.data;
}

export { createUser, loginUser };