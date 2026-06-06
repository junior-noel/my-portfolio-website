import API from "./axios.js";

export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const getMe = () => API.get("/auth/me");
