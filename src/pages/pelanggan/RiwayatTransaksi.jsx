import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

const RiwayatTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("access_token");
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Decode token untuk mendapatkan username
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload.preferred_username);

                // Fetch transaksi pelanggan
                const res = await API.get("/transaksi/pelanggan?status=Diambil");
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    setTransaksi(data);
                } else {
                    setTransaksi([]);
                }
            } catch (error) {
                console.error("Error fetching transaksi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaksi();
    }, []);

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

    const getFilteredTransaksi = () => {
        if (!searchTerm) return transaksi;
        
        return transaksi.filter(item =>
            item.Layanan?.nama_layanan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.layanan?.nama_layanan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id_transaksi?.toString().includes(searchTerm) ||
            item.berat?.toString().includes(searchTerm)
        );
    };

    const filteredTransaksi = getFilteredTransaksi();

    // Statistik transaksi
    const totalTransaksi = transaksi.length;
    const totalBelanja = transaksi.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const totalBerat = transaksi.reduce((sum, t) => sum + (t.berat || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Header link="/pelanggan" title="Riwayat Transaksi" />
                    
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Memuat Data</h3>
                            <p className="text-gray-600">Sedang mengambil riwayat transaksi Anda...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Header link="/pelanggan" title="Riwayat Transaksi" />

                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                Riwayat Transaksi Selesai 🎯
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Semua transaksi laundry yang telah selesai dan diambil
                            </p>
                            {user && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Pengguna: <span className="font-medium text-gray-700">{user}</span>
                                </p>
                            )}
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
                                <span className="text-4xl">📜</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Transaksi</p>
                                <p className="text-3xl font-bold">{totalTransaksi}</p>
                                <p className="text-green-200 text-xs mt-1">Transaksi selesai</p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm font-medium">Total Belanja</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalBelanja)}</p>
                                <p className="text-emerald-200 text-xs mt-1">Keseluruhan</p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-100 text-sm font-medium">Total Berat</p>
                                <p className="text-3xl font-bold">{totalBerat}</p>
                                <p className="text-teal-200 text-xs mt-1">Kilogram</p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">⚖️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Cari Transaksi
                        </h3>
                        <div className="flex-1 md:max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan layanan, ID transaksi, atau berat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    🔍
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {filteredTransaksi.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
                            <div className="text-6xl mb-4">
                                {searchTerm ? "🔍" : "📋"}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {searchTerm ? "Tidak Ditemukan" : "Belum Ada Riwayat"}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm 
                                    ? `Tidak ada transaksi yang cocok dengan "${searchTerm}"`
                                    : "Anda belum memiliki transaksi yang selesai"
                                }
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                                >
                                    Lihat Semua Transaksi
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTransaksi.map((item) => (
                            <div
                                key={item.id_transaksi}
                                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        {/* Main Info */}
                                        <div className="flex-1 mb-4 lg:mb-0">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 flex-shrink-0">
                                                    <span className="text-2xl">🎯</span>
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-800">
                                                            Transaksi #{item.id_transaksi}
                                                        </h3>
                                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-600 to-green-700 text-white">
                                                            Selesai
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                            <p className="text-sm text-gray-500 mb-1">Tanggal Selesai</p>
                                                            <p className="font-medium text-gray-800">{formatDate(item.tanggal_selesai || item.updated_at)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-1">Total Biaya</p>
                                                            <p className="font-bold text-green-600 text-lg">{formatCurrency(item.total_harga)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Info */}
                                        <div className="lg:ml-6">
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center">
                                                <div className="text-green-600 font-medium text-sm mb-2">✅ Transaksi Selesai</div>
                                                <div className="text-xs text-green-500">
                                                    Cucian telah diambil
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-green-200">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                                        <span className="text-xs text-green-600 font-medium">Completed</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary Footer */}
                {filteredTransaksi.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mt-8 border border-white/50">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>
                                Menampilkan {filteredTransaksi.length} dari {totalTransaksi} transaksi selesai
                            </span>
                            <span>
                                {searchTerm ? (
                                    <>Pencarian: <span className="font-medium text-green-600">"{searchTerm}"</span></>
                                ) : (
                                    <>Status: <span className="font-medium text-green-600">Diambil</span></>
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiwayatTransaksi;
