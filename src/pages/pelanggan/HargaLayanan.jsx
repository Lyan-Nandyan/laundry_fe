import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const HargaLayanan = () => {
    const [layanan, setLayanan] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch layanan data from API
        const fetchLayanan = async () => {
            try {
                setLoading(true);
                const res = await API.get("/layanan");
                const data = await res.json();
                setLayanan(Array.isArray(data) ? data : []);
                //cekStatus(res.status, "Data layanan berhasil dimuat");
            } catch (error) {
                console.error("Error fetching layanan data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLayanan();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getServiceIcon = (namaLayanan) => {
        const nama = namaLayanan?.toLowerCase() || "";
        if (nama.includes("cuci") && nama.includes("kering")) return "🧺";
        if (nama.includes("setrika")) return "👔";
        if (nama.includes("cuci")) return "🧼";
        if (nama.includes("dry clean")) return "✨";
        if (nama.includes("ekspres")) return "⚡";
        return "🧽";
    };

    const getPriceCategory = (harga) => {
        if (harga < 5000) return { label: "Ekonomis", color: "bg-green-100 text-green-700 border-green-200", icon: "💚" };
        if (harga < 10000) return { label: "Standar", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "💙" };
        if (harga < 15000) return { label: "Premium", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "💜" };
        return { label: "Eksklusif", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "⭐" };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Header link="/pelanggan" title="Harga Layanan" />
                    
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Memuat Data</h3>
                            <p className="text-gray-600">Sedang mengambil daftar harga layanan...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <Header link="/pelanggan" title="Harga Layanan" />

                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                Daftar Harga Layanan 💰
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Pilih layanan terbaik sesuai kebutuhan Anda
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
                                <span className="text-4xl">💵</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Total Layanan</p>
                                <p className="text-3xl font-bold">{layanan.length}</p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">🧺</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm font-medium">Harga Terendah</p>
                                <p className="text-2xl font-bold">
                                    {layanan.length > 0 ? formatCurrency(Math.min(...layanan.map(l => l.harga_per_kg || 0))) : "Rp 0"}
                                </p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">💚</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-rose-100 text-sm font-medium">Rata-rata Harga</p>
                                <p className="text-2xl font-bold">
                                    {layanan.length > 0 ? formatCurrency(layanan.reduce((sum, l) => sum + (l.harga_per_kg || 0), 0) / layanan.length) : "Rp 0"}
                                </p>
                            </div>
                            <div className="bg-white/20 rounded-full p-3">
                                <span className="text-2xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Cards */}
                {layanan.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50 max-w-md mx-auto">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Layanan</h3>
                            <p className="text-gray-600 mb-6">
                                Belum ada layanan yang tersedia saat ini
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {layanan.map((l) => {
                            const priceCategory = getPriceCategory(l.harga_per_kg || 0);
                            
                            return (
                                <div
                                    key={l.id_layanan}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-white/20 rounded-full p-2">
                                                    <span className="text-2xl">{getServiceIcon(l.nama_layanan)}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold">{l.nama_layanan || "Nama tidak tersedia"}</h3>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${priceCategory.color} bg-white/90 border`}>
                                                        {priceCategory.icon} {priceCategory.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        {/* Price Section */}
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500 mb-1">Harga per kg</p>
                                                <p className="text-3xl font-bold text-purple-600">
                                                    {formatCurrency(l.harga_per_kg || 0)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Service Details */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-sm text-gray-600">📦 ID Layanan</span>
                                                <span className="text-sm font-medium text-gray-800">
                                                    #{l.id_layanan}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-sm text-gray-600">✅ Status</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                    Tersedia
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-6">
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-center">
                                                <p className="text-sm text-gray-600 mb-2">
                                                    💡 <span className="font-medium">Info:</span> Harga dapat berubah sewaktu-waktu
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Kunjungi counter kami untuk menggunakan layanan ini
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Summary Footer */}
                {layanan.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mt-8 border border-white/50">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>
                                Menampilkan {layanan.length} layanan tersedia
                            </span>
                            <span>
                                Sistem Laundry • Daftar Harga • {new Date().getFullYear()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HargaLayanan;
