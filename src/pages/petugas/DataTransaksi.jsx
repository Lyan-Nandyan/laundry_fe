import React, { useState, useEffect } from "react";
import { API } from "../../api";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const DataTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                setLoading(true);
                const res = await API.get("/transaksi/status/Proses");
                const data = await res.json();
                setTransaksi(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching transaksi:", error);
                setError("Gagal memuat data transaksi");
            } finally {
                setLoading(false);
            }
        };

        fetchTransaksi();
    }, []);

    const handleSelesai = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menyelesaikan transaksi ini?")) return;
        try {
            const res = await API.patch(`/transaksi/${id}`, { status: "Selesai" });
            if (res.ok) {
                setTransaksi((prev) => prev.filter((t) => t.id_transaksi !== id));
                alert("Berhasil mengubah status");
            } else {
                alert("Gagal menyelesaikan transaksi");
            }
        } catch (error) {
            console.error("Error updating transaksi:", error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                ⏳ Transaksi Dalam Proses
                            </h2>
                            <p className="text-amber-100 text-sm mt-1">Memuat data transaksi...</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="animate-pulse flex items-center space-x-4">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                        <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                ⏳ Transaksi Dalam Proses
                            </h2>
                        </div>
                        <div className="p-8 text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h4 className="text-lg font-semibold text-red-600 mb-2">Terjadi Kesalahan</h4>
                            <p className="text-red-500 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <Header link="/petugas" title="Dashboard Petugas" />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    ⏳ Transaksi Dalam Proses
                                </h2>
                                <p className="text-amber-100 text-sm mt-1">
                                    {transaksi.length > 0 ? `${transaksi.length} transaksi sedang diproses` : 'Tidak ada transaksi dalam proses'}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <span className="text-white text-sm font-medium">Status: Proses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {transaksi.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">✨</div>
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">Semua Transaksi Selesai!</h4>
                            <p className="text-gray-500 mb-6">Tidak ada transaksi yang sedang dalam proses saat ini</p>
                            <Link to="/petugas/transaksi/tambah">
                                <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-200">
                                    Buat Transaksi Baru
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">No</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Pelanggan</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Layanan</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Berat</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Total</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {transaksi.map((t, index) => (
                                        <tr key={t.id_transaksi} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                        {(t.pelanggan?.nama || "?").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {t.pelanggan?.nama || "Data tidak tersedia"}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {t.pelanggan?.no_hp || "-"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {t.layanan?.nama_layanan || "Data tidak tersedia"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {t.layanan?.harga_per_kg ? formatCurrency(t.layanan.harga_per_kg) + '/kg' : '-'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-semibold text-gray-900">{t.berat}</span>
                                                    <span className="text-xs text-gray-500 ml-1">kg</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm font-bold text-green-600">
                                                    {formatCurrency(t.total_harga)}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200">
                                                    <span className="mr-1">⏳</span>
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <Link to={`/petugas/transaksi/${t.id_transaksi}`}>
                                                        <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center space-x-1">
                                                            <span>✏️</span>
                                                            <span>Edit</span>
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleSelesai(t.id_transaksi)}
                                                        className="bg-green-100 text-green-600 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
                                                    >
                                                        <span>✅</span>
                                                        <span>Selesai</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer */}
                    {transaksi.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    {transaksi.length} transaksi dalam proses
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-500">Status: Proses</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTransaksi;
