import React, { useState, useEffect } from "react";
import { API } from "../../api";
import Header from "../../components/Header";

const AddTransaksi = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [formData, setFormData] = useState({
        id_pelanggan: "",
        id_layanan: "",
        berat: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataLoading(true);
                
                const [pelangganRes, layananRes] = await Promise.all([
                    API.get("/pelanggan"),
                    API.get("/layanan")
                ]);
                
                const pelangganData = await pelangganRes.json();
                const layananData = await layananRes.json();
                
                setPelanggan(Array.isArray(pelangganData) ? pelangganData : []);
                setLayanan(Array.isArray(layananData) ? layananData : []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setStatus("Gagal memuat data pelanggan dan layanan");
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const response = await API.post("/transaksi", formData);
            
            if (response.ok) {
                setStatus("Transaksi berhasil ditambahkan");
                setTimeout(() => {
                    window.location.replace("/petugas/transaksi");
                }, 1500);
            } else {
                setStatus("Gagal menambahkan transaksi");
            }
        } catch (error) {
            console.error("Error adding transaksi:", error);
            setStatus("Terjadi kesalahan saat menambahkan transaksi");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const calculateTotal = () => {
        const selectedLayanan = layanan.find(l => l.id_layanan == formData.id_layanan);
        if (selectedLayanan && formData.berat) {
            return selectedLayanan.harga_per_kg * parseFloat(formData.berat);
        }
        return 0;
    };

    if (dataLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
                <div className="container mx-auto px-4 py-8 max-w-3xl">
                    <Header link="/petugas" title="Dashboard Petugas" />
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                📝 Tambah Transaksi Baru
                            </h2>
                            <p className="text-amber-100 text-sm mt-1">Memuat data...</p>
                        </div>
                        <div className="p-8">
                            <div className="animate-pulse space-y-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Header link="/petugas" title="Dashboard Petugas" />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            📝 Tambah Transaksi Baru
                        </h2>
                        <p className="text-amber-100 text-sm mt-1">
                            Buat transaksi laundry untuk pelanggan
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Pelanggan Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pilih Pelanggan
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">👤</span>
                                    </div>
                                    <select
                                        name="id_pelanggan"
                                        value={formData.id_pelanggan}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                    >
                                        <option value="">-- Pilih Pelanggan --</option>
                                        {pelanggan.map((p) => (
                                            <option key={p.id_pelanggan} value={p.id_pelanggan}>
                                                {p.nama} - {p.no_hp}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">▼</span>
                                    </div>
                                </div>
                                {pelanggan.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Belum ada pelanggan. Tambah pelanggan terlebih dahulu.
                                    </p>
                                )}
                            </div>

                            {/* Layanan Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pilih Layanan
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">🏷️</span>
                                    </div>
                                    <select
                                        name="id_layanan"
                                        value={formData.id_layanan}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                    >
                                        <option value="">-- Pilih Layanan --</option>
                                        {layanan.map((l) => (
                                            <option key={l.id_layanan} value={l.id_layanan}>
                                                {l.nama_layanan} - {formatCurrency(l.harga_per_kg)}/kg
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">▼</span>
                                    </div>
                                </div>
                                {layanan.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Belum ada layanan. Tambah layanan terlebih dahulu.
                                    </p>
                                )}
                            </div>

                            {/* Berat Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Berat Cucian
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">⚖️</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="berat"
                                        placeholder="Contoh: 2.5"
                                        value={formData.berat}
                                        onChange={handleChange}
                                        min="0.1"
                                        step="0.1"
                                        required
                                        className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400 text-sm">kg</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Masukkan berat cucian dalam kilogram (contoh: 2.5)
                                </p>
                            </div>

                            {/* Total Calculation */}
                            {formData.id_layanan && formData.berat && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Estimasi Total</p>
                                            <p className="text-xs text-gray-500">
                                                {formData.berat} kg × {formatCurrency(layanan.find(l => l.id_layanan == formData.id_layanan)?.harga_per_kg || 0)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatCurrency(calculateTotal())}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    disabled={loading || pelanggan.length === 0 || layanan.length === 0}
                                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                                        loading || pelanggan.length === 0 || layanan.length === 0
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>💾</span>
                                            <span>Buat Transaksi</span>
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
                                Pastikan data sudah benar sebelum menyimpan
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                <span className="text-xs text-gray-500">Form Tambah Transaksi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaksi;
