import React, { useState } from "react";
import { API, cekStatus } from "../../api";
import Header from "../../components/Header";

const AddPelanggan = () => {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const res = await API.post("/pelanggan", { nama, no_hp: noHp });
      setStatus(await cekStatus(res, "Pelanggan berhasil ditambahkan"));
      
      if (res.ok) {
        setTimeout(() => {
          window.location.replace("/petugas/pelanggan");
        }, 1500);
      }
    } catch (error) {
      setStatus("Terjadi kesalahan saat menambahkan pelanggan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header link="/petugas" title="Dashboard Petugas" />
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              👤 Tambah Pelanggan Baru
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              Masukkan data pelanggan untuk mendaftar ke sistem
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Nama Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* No HP Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Handphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">📱</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Nomor handphone akan digunakan untuk komunikasi
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Kembali</span>
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      <span>Simpan Pelanggan</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status && (
              <div className={`mt-6 p-4 rounded-lg border ${
                status.includes("berhasil") 
                  ? "bg-green-50 border-green-200 text-green-700" 
                  : "bg-red-50 border-red-200 text-red-700"
              }`}>
                <div className="flex items-center space-x-2">
                  <span>{status.includes("berhasil") ? "✅" : "❌"}</span>
                  <span className="font-medium">{status}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Pastikan data yang dimasukkan sudah benar
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-xs text-gray-500">Form Tambah Pelanggan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPelanggan;
