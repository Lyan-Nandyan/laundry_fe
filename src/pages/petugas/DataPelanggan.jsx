import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api";
import Header from "../../components/Header";

const DataPelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPelanggan = async () => {
            try {
                setLoading(true);
                const res = await API.get("/pelanggan");
                const data = await res.json();
                setPelanggan(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching pelanggan data:", error);
                setError("Gagal memuat data pelanggan");
            } finally {
                setLoading(false);
            }
        };
        fetchPelanggan();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) return;
        try {
            const res = await API.delete(`/pelanggan/${id}`);
            if (res.ok) {
                setPelanggan((prev) => prev.filter((p) => p.id_pelanggan !== id));
                alert("Pelanggan berhasil dihapus");
            } else {
                alert("Gagal menghapus pelanggan");
            }
        } catch (error) {
            console.error("Error deleting pelanggan:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                👥 Data Pelanggan
                            </h2>
                            <p className="text-purple-100 text-sm mt-1">Memuat data pelanggan...</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="animate-pulse flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
                                👥 Data Pelanggan
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
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    👥 Data Pelanggan
                                </h2>
                                <p className="text-purple-100 text-sm mt-1">
                                    {pelanggan.length > 0 ? `Total ${pelanggan.length} pelanggan terdaftar` : 'Belum ada data pelanggan'}
                                </p>
                            </div>
                            <Link to="/petugas/pelanggan/tambah">
                                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2">
                                    <span>➕</span>
                                    <span className="font-medium">Tambah Pelanggan</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {pelanggan.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h4 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Pelanggan</h4>
                            <p className="text-gray-500 mb-6">Mulai tambahkan data pelanggan untuk memulai transaksi</p>
                            <Link to="/petugas/pelanggan/tambah">
                                <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                                    Tambah Pelanggan Pertama
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">ID</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Pelanggan</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Kontak</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pelanggan.map((p) => (
                                        <tr key={p.id_pelanggan} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                                    {p.id_pelanggan}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                        {p.nama.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {p.nama}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            ID: {p.id_pelanggan}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">📱</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {p.no_hp}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Nomor HP
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button 
                                                    onClick={() => handleDelete(p.id_pelanggan)}
                                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
                                                >
                                                    <span>🗑️</span>
                                                    <span>Hapus</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer */}
                    {pelanggan.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Total {pelanggan.length} pelanggan terdaftar
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
export default DataPelanggan;
