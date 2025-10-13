import dotenv from "dotenv";
dotenv.config();

let isRefreshing = false;
let refreshPromise = null;

export async function apiRequest(url, options = {}) {
  const token = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 && refresh) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = fetch(`${process.env.BE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      })
        .then((r) => r.json())
        .then((newTokens) => {
          localStorage.setItem("access_token", newTokens.access_token);
          localStorage.setItem("refresh_token", newTokens.refresh_token);
          return newTokens.access_token;
        })
        .finally(() => (isRefreshing = false));
    }

    const newToken = await refreshPromise;

    // ulang request pakai token baru
    return await apiRequest(url, options);
  }

  return res;
}
