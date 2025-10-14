import React from "react";
import LogoutButton from "../components/LogoutButton";

const LandingPelanggan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Pelanggan</h1>
          <LogoutButton />
        </div>
        
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Selamat Datang! 🌟
          </h2>
          <p className="text-gray-600">
            Nikmati layanan laundry terbaik kami. Cek status cucian dan riwayat transaksi Anda.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Status Cucian</h3>
              <p className="text-gray-600 text-sm">Lihat status cucian Anda saat ini</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Riwayat Transaksi</h3>
              <p className="text-gray-600 text-sm">Lihat riwayat laundry Anda</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Harga Layanan</h3>
              <p className="text-gray-600 text-sm">Cek daftar harga layanan kami</p>
            </div>
          </div>
        </div>
        
        {/* Quick Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Layanan Cepat & Berkualitas</h3>
            <p className="text-blue-100">
              Kami berkomitmen memberikan layanan laundry terbaik dengan hasil yang memuaskan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPelanggan;
