import { apiPost, apiGet, apiDelete, apiPut } from "./api";

const getAuthToken = () => localStorage.getItem("access_token") || localStorage.getItem("authToken");

const createProject = async (data) => {
    const token = getAuthToken();
    const response = await apiPost("/projects", data, {
    headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const getAllProjects = async () => {
    const token = getAuthToken();
    const projects = await apiGet("/projects", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("Fetched Projects:", projects.data); // Log the fetched projects for debugging
    return projects.data;
}

const deleteProject = async (projectId) => {
    const token = getAuthToken();
    const response = await apiDelete(`/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const deleteAllProjects = async () => {
    const token = getAuthToken();
    const response = await apiDelete('/projects/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const updateProject = async (projectId, data) => {
    const token = getAuthToken();
    const response = await apiPut(`/projects/${projectId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export { createProject, getAllProjects, deleteProject, deleteAllProjects, updateProject };