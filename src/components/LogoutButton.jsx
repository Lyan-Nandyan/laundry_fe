import React from "react";
import { API } from "../api";

const LogoutButton = () => {
  const handleLogout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) return window.location.replace("/login");

    try {
      await API.post("/auth/logout", { refresh_token });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.replace("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105 flex items-center gap-2"
    >
      <span>🚪</span>
      Logout
    </button>
  );
}

export default LogoutButton;