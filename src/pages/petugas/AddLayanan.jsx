import React, { useState } from "react";
import { API, cekStatus } from "../../api";
import Header from "../../components/Header";

const AddLayanan = () => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        setLoading(true);

        try {
            const res = await API.post("/layanan", {
                nama_layanan: nama,
                harga_per_kg: harga,
            });
            
            setStatus(await cekStatus(res, "Layanan berhasil ditambahkan"));
            
            if (res.ok) {
                setTimeout(() => {
                    window.location.replace("/petugas/layanan");
                }, 1500);
            }
        } catch (error) {
            setStatus("Terjadi kesalahan saat menambahkan layanan");
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <Header link="/petugas" title="Dashboard Petugas" />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            🏷️ Tambah Layanan Baru
                        </h2>
                        <p className="text-indigo-100 text-sm mt-1">
                            Buat layanan laundry baru dengan harga yang kompetitif
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
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>💾</span>
                                            <span>Simpan Layanan</span>
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
                                Harga dapat diubah sewaktu-waktu
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                <span className="text-xs text-gray-500">Form Tambah Layanan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLayanan;