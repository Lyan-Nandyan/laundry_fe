import React, { useState, useEffect } from "react";
import { API } from "../../api";

const TableTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                setLoading(true);
                const res = await API.get("/transaksi");
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Selesai':
                return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
            case 'Proses':
                return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';
            case 'Menunggu':
                return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
            case 'Diambil':
                return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200';
            default:
                return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selesai':
                return '✅';
            case 'Proses':
                return '⏳';
            case 'Menunggu':
                return '⏸️';
            case 'Diambil':
                return '📦';
            default:
                return '❓';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        📋 Transaksi Terbaru
                    </h3>
                    <p className="text-indigo-100 text-sm mt-1">Memuat data transaksi...</p>
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
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        📋 Transaksi Terbaru
                    </h3>
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
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center">
                            📋 Transaksi Terbaru
                        </h3>
                        <p className="text-indigo-100 text-sm mt-1">
                            {transaksi.length > 0 ? `Menampilkan ${Math.min(10, transaksi.length)} dari ${transaksi.length} transaksi` : 'Belum ada data'}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-white text-sm font-medium">Total: {transaksi.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {transaksi.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Transaksi</h4>
                    <p className="text-gray-500">Transaksi akan muncul di sini setelah ada aktivitas</p>
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
                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transaksi.slice(0, 10).map((t, index) => (
                                <tr key={t.id_transaksi} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
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
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(t.status)}`}>
                                            <span className="mr-1">{getStatusIcon(t.status)}</span>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{formatDate(t.tanggal)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer */}
            {transaksi.length > 10 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Menampilkan 10 dari {transaksi.length} transaksi
                        </p>
                        <button className="text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200">
                            Lihat Semua
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableTransaksi;