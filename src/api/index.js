import dotenv from "dotenv";
dotenv.config();

export const API = {
  get: (url) => apiRequest(url),
  post: (url, body) => apiRequest(`${process.env.BE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  put: (url, body) => apiRequest(`${process.env.BE_URL}${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  delete: (url) => apiRequest(`${process.env.BE_URL}${url}`, { method: "DELETE" }),
};
