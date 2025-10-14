import { apiRequest } from "./api";
const baseUrl = process.env.REACT_APP_BE_URL;

const API = {
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

const cekStatus = async (res, statusText) => {
  if (res.status === 200 || res.status === 201) {
      return(statusText || "Berhasil");
    } else if (res.status === 403) {
      return("Akses ditolak: role tidak sesuai");
    } else if (res.status === 401) {
      return("Sesi berakhir. Silakan login kembali.");
    } else {
      const text = await res.text().catch(() => "");
      return(`Gagal menjalankan permintaan. ${text}`);
    }
};
export { API, cekStatus };