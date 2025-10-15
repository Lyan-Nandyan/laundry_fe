import React, { useState, useEffect } from "react";
import { API, cekStatus } from "../../api";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EditLayananForm = () => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataLoading(true);
                const res = await API.get(`/layanan/${id}`);
                const data = await res.json();
                
                if (res.ok) {
                    const { nama_layanan, harga_per_kg } = data;
                    setNama(nama_layanan);
                    setHarga(harga_per_kg);
                } else {
                    setStatus("Gagal memuat data layanan");
                }
            } catch (error) {
                console.error("Error fetching layanan:", error);
                setStatus("Terjadi kesalahan saat memuat data");
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        setLoading(true);

        try {
            const res = await API.put(`/layanan/${id}`, { 
                nama_layanan: nama, 
                harga_per_kg: harga 
            });
            
            setStatus(await cekStatus(res, "Layanan berhasil diperbarui"));
            
            if (res.ok) {
                setTimeout(() => {
                    window.location.replace("/petugas/layanan");
                }, 1500);
            }
        } catch (error) {
            setStatus("Terjadi kesalahan saat memperbarui layanan");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value);
    };

    if (dataLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-2xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                ✏️ Edit Layanan
                            </h2>
                            <p className="text-indigo-100 text-sm mt-1">Memuat data layanan...</p>
                        </div>
                        <div className="p-8">
                            <div className="animate-pulse space-y-6">
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                </div>
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-12 bg-gray-200 rounded w-24"></div>
                                    <div className="h-12 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <Header link="/petugas" title="Dashboard Petugas" />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            ✏️ Edit Layanan
                        </h2>
                        <p className="text-indigo-100 text-sm mt-1">
                            Perbarui informasi layanan laundry
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Nama Layanan Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Layanan
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">🏷️</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Cuci + Setrika, Dry Cleaning"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Berikan nama yang jelas dan mudah dipahami
                                </p>
                            </div>

                            {/* Harga Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Harga per Kilogram
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">💰</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="5000"
                                        value={harga}
                                        onChange={(e) => setHarga(e.target.value)}
                                        min="0"
                                        step="100"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400 text-sm">/kg</span>
                                    </div>
                                </div>
                                {harga && (
                                    <p className="text-xs text-indigo-600 mt-1 font-medium">
                                        Preview: {formatCurrency(harga)} per kilogram
                                    </p>
                                )}
                            </div>

                            {/* Current Info Display */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Informasi Saat Ini</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">ID Layanan:</span>
                                        <span className="ml-2 font-medium text-gray-800">#{id}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Status:</span>
                                        <span className="ml-2 font-medium text-green-600">Aktif</span>
                                    </div>
                                </div>
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
                                            : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Memperbarui...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>💾</span>
                                            <span>Perbarui Layanan</span>
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
                                Perubahan akan langsung berlaku setelah disimpan
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                <span className="text-xs text-gray-500">Form Edit Layanan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLayananForm;
