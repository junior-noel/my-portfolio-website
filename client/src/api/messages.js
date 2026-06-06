import API from "./axios.js";

export const getMessages = () => API.get("/messages");
export const markAsRead = (id) => API.put(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);
