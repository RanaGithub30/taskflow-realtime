import { apiPost, apiGet, apiDelete } from "./api";

const createProject = async (data) => {
    const token = localStorage.getItem("access_token");
    const response = await apiPost("/projects", data, {
    headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const getAllProjects = async () => {
    const token = localStorage.getItem("access_token");
    const projects = await apiGet("/projects", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("Fetched Projects:", projects.data); // Log the fetched projects for debugging
    return projects.data;
}

const deleteProject = async (projectId) => {
    const token = localStorage.getItem("access_token");
    const response = await apiDelete(`/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export { createProject, getAllProjects, deleteProject };