import { apiRequest } from "./api";
const baseUrl = process.env.REACT_APP_BE_URL;

export const API = {
  get: (url) => apiRequest(url),
  post: (url, body) => apiRequest(`${baseUrl}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  put: (url, body) => apiRequest(`${baseUrl}${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  delete: (url) => apiRequest(`${baseUrl}${url}`, { method: "DELETE" }),
};
