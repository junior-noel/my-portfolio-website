import API from "./axios.js";

export const sendContact = (data) => API.post("/contact", data);
