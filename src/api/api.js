const baseUrl = process.env.REACT_APP_BE_URL;
let isRefreshing = false;
let refreshPromise = null;

export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  // console.log("API Request to: " + url);
  // console.log("Options:", options);
  // console.log("Token:", token);
  // console.log("Refresh Token:", refresh);
  // console.log("Request Headers:", {
  //   "Content-Type": "application/json",
  //   ...options.headers,
  //   Authorization: token ? `Bearer ${token}` : "",
  // });

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Jika token expired
  if (res.status === 401 && refresh) {
    //alert("Access token expired → Refreshing...");
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      })
        .then(async (r) => {
          if (!r.ok) throw new Error("Invalid refresh token");
          const newTokens = await r.json();
          localStorage.setItem("access_token", newTokens.access_token);
          localStorage.setItem("refresh_token", newTokens.refresh_token);
          return newTokens.access_token;
        })
        .catch(async () => {
          try {
            await fetch(`${baseUrl}/auth/logout`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh_token: refresh }),
            });
          } catch {}
          localStorage.clear();
          window.location.href = "/login";
        })
    }

    const newAccessToken = await refreshPromise;
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return res;
};
