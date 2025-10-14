import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import LandingAdmin from "./pages/LandingAdmin";
import LandingPetugas from "./pages/LandingPetugas";
import LandingPelanggan from "./pages/LandigPelanggan";
import AddPelanggan from "./pages/petugas/AddPelanggan";
import DataPelanggan from "./pages/petugas/DataPelanggan";

const getStoredTokens = () => ({
  access: localStorage.getItem("access_token"),
  refresh: localStorage.getItem("refresh_token"),
});

const parseRolesFromToken = (token) => {
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.realm_access?.roles || [];
  } catch {
    return [];
  }
};

const chooseRedirectByRoles = (roles) => {
  if (roles.includes("admin")) return "/admin";
  if (roles.includes("petugas")) return "/petugas";
  if (roles.includes("pelanggan")) return "/pelanggan";
  return "/login";
};

const RedirectIfAuthenticated = ({ children }) => {
  const { access, refresh } = getStoredTokens();
  if (access && refresh) {
    const roles = parseRolesFromToken(access);
    const to = chooseRedirectByRoles(roles);
    return <Navigate to={to} replace />;
  }
  return children;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { access, refresh } = getStoredTokens();
  if (!access || !refresh) return <Navigate to="/login" replace />;

  const roles = parseRolesFromToken(access);
  const hasAccess = roles.some((r) => allowedRoles.includes(r));
  if (!hasAccess) return <Navigate to="/login" replace />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        {/*Route Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LandingAdmin />
            </ProtectedRoute>
          }
        />

        {/*Route Petugas */}
        <Route
          path="/petugas"
          element={
            <ProtectedRoute allowedRoles={["petugas"]}>
              <LandingPetugas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/petugas/pelanggan"
          element={
            <ProtectedRoute allowedRoles={["petugas"]}>
              <DataPelanggan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/petugas/pelanggan/tambah"
          element={
            <ProtectedRoute allowedRoles={["petugas"]}>
              <AddPelanggan />
            </ProtectedRoute>
          }
        />

        {/*Route Pelanggan */}
        <Route
          path="/pelanggan"
          element={
            <ProtectedRoute allowedRoles={["pelanggan"]}>
              <LandingPelanggan />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
