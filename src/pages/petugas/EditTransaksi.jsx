import React, { useState, useEffect } from "react";
import { API } from "../../api";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EditTransaksi = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [status, setStatus] = useState("");
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id_pelanggan: "",
        id_layanan: "",
        berat: "",
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setDataLoading(true);
                
                const [transaksiRes, pelangganRes, layananRes] = await Promise.all([
                    API.get(`/transaksi/${id}`),
                    API.get("/pelanggan"),
                    API.get("/layanan")
                ]);
                
                // Handle transaksi data
                if (transaksiRes.ok) {
                    const transaksiData = await transaksiRes.json();
                    const { id_pelanggan, id_layanan, berat } = transaksiData;
                    setFormData({ id_pelanggan, id_layanan, berat });
                }
                
                // Handle pelanggan data
                const pelangganData = await pelangganRes.json();
                setPelanggan(Array.isArray(pelangganData) ? pelangganData : []);
                
                // Handle layanan data
                const layananData = await layananRes.json();
                setLayanan(Array.isArray(layananData) ? layananData : []);
                
            } catch (error) {
                console.error("Error fetching data:", error);
                setStatus("Gagal memuat data transaksi");
            } finally {
                setDataLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

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
            const res = await API.put(`/transaksi/${id}`, formData);
            
            if (res.ok) {
                setStatus("Transaksi berhasil diperbarui");
                setTimeout(() => {
                    window.location.replace("/petugas/transaksi");
                }, 1500);
            } else {
                setStatus("Gagal memperbarui transaksi");
            }
        } catch (error) {
            console.error("Error updating transaksi:", error);
            setStatus("Terjadi kesalahan saat memperbarui transaksi");
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
                                ✏️ Edit Transaksi
                            </h2>
                            <p className="text-amber-100 text-sm mt-1">Memuat data transaksi...</p>
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
                            ✏️ Edit Transaksi
                        </h2>
                        <p className="text-amber-100 text-sm mt-1">
                            Perbarui informasi transaksi laundry
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Current Info Display */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 mb-6">
                                <h4 className="text-sm font-semibold text-orange-700 mb-2">ℹ️ Informasi Transaksi</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">ID Transaksi:</span>
                                        <span className="ml-2 font-medium text-gray-800">#{id}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Status:</span>
                                        <span className="ml-2 font-medium text-yellow-600">Dapat Diedit</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pelanggan Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pelanggan
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
                            </div>

                            {/* Layanan Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Layanan
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
                                            <p className="text-sm font-medium text-gray-700">Total Baru</p>
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
                                    disabled={loading}
                                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                                        loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                                            <span>Perbarui Transaksi</span>
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
                                Hati-hati saat mengubah data transaksi
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                <span className="text-xs text-gray-500">Form Edit Transaksi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTransaksi;