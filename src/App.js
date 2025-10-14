import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import LandingAdmin from "./pages/LandingAdmin";
import LandingPetugas from "./pages/LandingPetugas";
import LandingPelanggan from "./pages/LandigPelanggan";
import AddPelanggan from "./pages/petugas/AddPelanggan";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/login" replace />;

  // decode payload JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  const roles = payload?.realm_access?.roles || [];

  // jika role cocok, lanjut
  const hasAccess = roles.some((r) => allowedRoles.includes(r));
  if (!hasAccess) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
