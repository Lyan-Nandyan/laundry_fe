import React, { useState, useEffect } from "react";
import { API } from "../../api";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const DataLayanan = () => {
    const [layanan, setLayanan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLayanan = async () => {
            try {
                setLoading(true);
                const res = await API.get("/layanan");
                const data = await res.json();
                setLayanan(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching layanan data:", error);
                setError("Gagal memuat data layanan");
            } finally {
                setLoading(false);
            }
        };
        fetchLayanan();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
        try {
            const res = await API.delete(`/layanan/${id}`);
            if (res.ok) {
                setLayanan((prev) => prev.filter((l) => l.id_layanan !== id));
                alert("Layanan berhasil dihapus");
            } else {
                alert("Gagal menghapus layanan");
            }
        } catch (error) {
            console.error("Error deleting layanan:", error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                🏷️ Data Layanan
                            </h2>
                            <p className="text-indigo-100 text-sm mt-1">Memuat data layanan...</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="animate-pulse flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                        <div className="w-20 h-8 bg-gray-200 rounded"></div>
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
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                🏷️ Data Layanan
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
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Header link="/petugas" title="Dashboard Petugas" />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    🏷️ Data Layanan
                                </h2>
                                <p className="text-indigo-100 text-sm mt-1">
                                    {layanan.length > 0 ? `Total ${layanan.length} layanan tersedia` : 'Belum ada layanan'}
                                </p>
                            </div>
                            <Link to="/petugas/layanan/tambah">
                                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2">
                                    <span>➕</span>
                                    <span className="font-medium">Tambah Layanan</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {layanan.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">🏷️</div>
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Layanan</h4>
                            <p className="text-gray-500 mb-6">Tambahkan layanan laundry untuk memulai operasional</p>
                            <Link to="/petugas/layanan/tambah">
                                <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200">
                                    Tambah Layanan Pertama
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">ID</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Layanan</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Harga</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {layanan.map((l) => (
                                        <tr key={l.id_layanan} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                                                    {l.id_layanan}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                        🏷️
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {l.nama_layanan}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            ID: {l.id_layanan}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">💰</span>
                                                    <div>
                                                        <div className="text-sm font-bold text-green-600">
                                                            {formatCurrency(l.harga_per_kg)}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            per kilogram
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <Link to={`/petugas/layanan/${l.id_layanan}`}>
                                                        <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center space-x-1">
                                                            <span>✏️</span>
                                                            <span>Edit</span>
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(l.id_layanan)}
                                                        className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
                                                    >
                                                        <span>🗑️</span>
                                                        <span>Hapus</span>
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
                    {layanan.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Total {layanan.length} layanan tersedia
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-gray-500">Data ter-update</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataLayanan;
