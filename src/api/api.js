const baseUrl = process.env.REACT_APP_BE_URL;

let isRefreshing = false;
let refreshPromise = null;

export const apiRequest = async (url, options = {}) => {
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
      refreshPromise = fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      });
      if (refreshPromise.ok) {
        const newTokens = await refreshPromise.json();
        localStorage.setItem("access_token", newTokens.access_token);
        localStorage.setItem("refresh_token", newTokens.refresh_token);

        // ulang request pakai token baru
        return await apiRequest(url, options);
      } else {
        console.warn("Refresh token invalid, logging out...");
        try {
        await fetch(`${baseUrl}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refresh }),
        });
      } catch {}
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  }

  return res;
};
