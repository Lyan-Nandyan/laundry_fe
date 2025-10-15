import React from "react";
import Header from "../components/Header";
import StatistikPendapatan from "./pemilik/StatistikPendapatan";
import TableTransaksi from "./pemilik/TableTransaksi";

const LandingPemilik = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Header />

        {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Selamat Datang, Pemilik! 👋
              </h2>
              <p className="text-gray-600 text-lg">
                Anda berhasil login sebagai Pemilik. Kelola sistem laundry dengan mudah dan efisien.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl opacity-20">🏢</div>
            </div>
          </div>
        </div>

        {/* Statistik Pendapatan */}
        <StatistikPendapatan />

        {/* Tabel Transaksi */}
        <TableTransaksi />

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Dashboard Pemilik • Sistem Manajemen Laundry • {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default LandingPemilik;
