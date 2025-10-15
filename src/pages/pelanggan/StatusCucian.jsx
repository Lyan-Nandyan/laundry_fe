import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { API } from "../../api";

const StatusCucian = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        // Decode token untuk mendapatkan username
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload.preferred_username);

        // Fetch transaksi pelanggan
        const res = await API.get("/transaksi/pelanggan?status=Proses,Selesai");
        const data = await res.json();
        
        if (res.ok && Array.isArray(data)) {
          // Filter hanya transaksi yang belum selesai
          const ongoingTransaksi = data.filter(
            (item) => item.status !== "Selesai"
          );
          setTransaksi(ongoingTransaksi);
        } else {
          setTransaksi([]);
        }
      } catch (error) {
        console.error("Error fetching transaksi:", error);
        setError(error.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      "Baru": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "Proses": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
      "Sedang Dicuci": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
      "Sedang Dikeringkan": "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      "Sedang Disetrika": "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
      "Siap Diambil": "bg-gradient-to-r from-green-500 to-green-600 text-white",
      "Selesai": "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    };
    return statusColors[status] || "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Baru": "📝",
      "Proses": "🧼",
      "Sedang Dicuci": "🧼",
      "Sedang Dikeringkan": "🌪️",
      "Sedang Disetrika": "👔",
      "Siap Diambil": "✅",
      "Selesai": "🎯"
    };
    return icons[status] || "📋";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Format tanggal tidak valid";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header link="/pelanggan" title="Status Cucian" />
          
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Memuat Data</h3>
              <p className="text-gray-600">Sedang mengambil status cucian Anda...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header link="/pelanggan" title="Status Cucian" />
          
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Terjadi Kesalahan</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header link="/pelanggan" title="Status Cucian" />

        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Status Cucian Anda 👕
              </h2>
              <p className="text-gray-600 text-lg">
                Pantau progres cucian Anda secara real-time
              </p>
              {user && (
                <p className="text-sm text-gray-500 mt-2">
                  Pengguna: <span className="font-medium text-gray-700">{user}</span>
                </p>
              )}
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4">
                <span className="text-4xl">🧺</span>
              </div>
            </div>
          </div>
        </div>

        {transaksi.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
              <div className="text-6xl mb-4">🧺</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Cucian Aktif</h3>
              <p className="text-gray-600 mb-6">
                Saat ini Anda tidak memiliki cucian yang sedang diproses
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  💡 <span className="font-medium">Tips:</span> Kunjungi counter kami untuk melakukan transaksi laundry baru
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Transaksi</p>
                    <p className="text-3xl font-bold">{transaksi.length}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Sedang Diproses</p>
                    <p className="text-3xl font-bold">
                      {transaksi.filter(t => !["Siap Diambil", "Selesai"].includes(t.status)).length}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Siap Diambil</p>
                    <p className="text-3xl font-bold">
                      {transaksi.filter(t => t.status === "Siap Diambil").length}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {transaksi.map((item, index) => (
                <div
                  key={item.id_transaksi || index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Main Info */}
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-3 flex-shrink-0">
                            <span className="text-2xl">{getStatusIcon(item.status)}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-800">
                                Transaksi #{item.id_transaksi}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Layanan</p>
                                <p className="font-medium text-gray-800">
                                  {item.Layanan?.nama_layanan || item.layanan?.nama_layanan || `ID: ${item.id_layanan}`}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Berat</p>
                                <p className="font-medium text-gray-800">{item.berat} kg</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Tanggal Masuk</p>
                                <p className="font-medium text-gray-800">{formatDate(item.tanggal_masuk)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Total Biaya</p>
                                <p className="font-bold text-blue-600 text-lg">{formatCurrency(item.total_harga)}</p>
                              </div>
                            </div>

                            {item.catatan && (
                              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Catatan:</span> {item.catatan}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Progress */}
                      <div className="lg:ml-6 lg:w-80">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Progress Cucian</h4>
                          <div className="space-y-2">
                            {["Baru", "Proses", "Siap Diambil"].map((status, idx) => {
                              const isCompleted = ["Baru", "Proses", "Siap Diambil"].indexOf(item.status) >= idx;
                              const isCurrent = item.status === status;
                              
                              return (
                                <div
                                  key={status}
                                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                                    isCurrent
                                      ? "bg-blue-100 border-l-4 border-blue-500"
                                      : isCompleted
                                      ? "bg-green-50"
                                      : "bg-white"
                                  }`}
                                >
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      isCompleted
                                        ? isCurrent
                                          ? "bg-blue-500 animate-pulse"
                                          : "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <span
                                    className={`text-sm ${
                                      isCurrent
                                        ? "font-semibold text-blue-700"
                                        : isCompleted
                                        ? "text-green-700"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {status}
                                  </span>
                                  {isCurrent && (
                                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                      Sedang Proses
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusCucian;
