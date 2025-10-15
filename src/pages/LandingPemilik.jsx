import React from "react";
import Header from "../components/Header";
import StatistikPendapatan from "./pemilik/StatistikPendapatan";
import TableTransaksi from "./pemilik/TableTransaksi";

const LandingPemilik = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Selamat Datang, Pemilik! 👋
          </h2>
          <p className="text-gray-600">
            Anda berhasil login sebagai Pemilik. Kelola sistem laundry dengan mudah.
          </p>
        </div>

        {/* Statistik Pendapatan */}
        <StatistikPendapatan />

        {/* Tabel Transaksi */}
        <TableTransaksi />

      </div>
    </div>
  );
};

export default LandingPemilik;
