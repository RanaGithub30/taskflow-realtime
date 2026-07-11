import { apiPost, apiGet } from "./api";

const createProject = async (data) => {
    const token = localStorage.getItem("access_token");
    console.log("Access Token:", token); // Log the token to verify it's being retrieved correctly
    const response = await apiPost("/projects", data, {
    headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export { createProject };