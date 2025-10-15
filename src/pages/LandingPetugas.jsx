import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const LandingPetugas = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header link="/petugas" title="Dashboard Petugas" />

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Selamat Datang, Petugas! 🧺
          </h2>
          <p className="text-gray-600">
            Kelola transaksi laundry dan layani pelanggan dengan baik.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <Link to="/petugas/transaksi/tambah">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Transaksi Baru</h3>
                <p className="text-gray-600 text-sm">Buat transaksi laundry baru</p>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <Link to="/petugas/transaksi">
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Status Cucian</h3>
                <p className="text-gray-600 text-sm">Update status cucian pelanggan</p>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <Link to="/petugas/transaksi/selesai">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Selesai</h3>
              <p className="text-gray-600 text-sm">Status Cucian selesai</p>
            </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <Link to="/petugas/pelanggan">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Pelanggan</h3>
                <p className="text-gray-600 text-sm">Lihat dan kelola data pelanggan</p>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <Link to="/petugas/layanan">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏷️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Layanan</h3>
                <p className="text-gray-600 text-sm">Kelola layanan laundry</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPetugas;
