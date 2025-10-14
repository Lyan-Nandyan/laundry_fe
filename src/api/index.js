import { apiRequest } from "./api";
const baseUrl = process.env.REACT_APP_BE_URL;

export const API = {
  get: (path) => apiRequest(`${baseUrl}${path}`, {
     method: "GET", 
    }),
  post: (path, body) =>
    apiRequest(`${baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    apiRequest(`${baseUrl}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    apiRequest(`${baseUrl}${path}`, {
      method: "DELETE",
    }),
};

export const cekStatus = async (res, msg = "Berhasil") => {
  if (res.status === 200 || res.status === 201) return msg;
  if (res.status === 403) return "Akses ditolak: role tidak sesuai";
  if (res.status === 401) return "Sesi berakhir. Silakan login kembali.";
  const text = await res.text().catch(() => "");
  return `Gagal menjalankan permintaan. ${text}`;
};
