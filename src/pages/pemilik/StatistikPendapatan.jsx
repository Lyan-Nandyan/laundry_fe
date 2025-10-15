import React, { useState, useEffect } from "react";
import { API } from "../../api";

const StatistikPendapatan = () => {
    const [stats, setStats] = useState({
        totalPendapatan: 0,
        totalTransaksi: 0,
        transaksiSelesai: 0,
        transaksiProses: 0,
        pendapatanBulanIni: 0,
        transaksiHariIni: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await API.get("/transaksi");
                const data = await res.json();

                if (Array.isArray(data)) {
                    calculateStats(data);
                }
            } catch (error) {
                console.error("Error fetching statistics:", error);
                setError("Gagal memuat statistik");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const calculateStats = (transaksi) => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const today = now.toDateString();

        const totalPendapatan = transaksi
            .filter(t => t.status === 'Diambil')
            .reduce((sum, t) => sum + (t.total_harga || 0), 0);

        const totalTransaksi = transaksi.length;

        const transaksiSelesai = transaksi.filter(t => t.status === 'Selesai').length;

        const transaksiProses = transaksi.filter(t => t.status === 'Proses').length;

        const pendapatanBulanIni = transaksi
            .filter(t => {
                const transaksiDate = new Date(t.tanggal);
                return t.status === 'Diambil' &&
                    transaksiDate.getMonth() === currentMonth &&
                    transaksiDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + (t.total_harga || 0), 0);

        const transaksiHariIni = transaksi
            .filter(t => new Date(t.tanggal).toDateString() === today)
            .length;

        setStats({
            totalPendapatan,
            totalTransaksi,
            transaksiSelesai,
            transaksiProses,
            pendapatanBulanIni,
            transaksiHariIni
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            📊 Dashboard Statistik
                        </span>
                    </h2>
                    <div className="animate-pulse flex space-x-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="animate-pulse">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            📊 Dashboard Statistik
                        </span>
                    </h2>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-xl font-semibold text-red-600 mb-2">Terjadi Kesalahan</h3>
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const statistikCards = [
        {
            title: "Total Pendapatan",
            value: formatCurrency(stats.totalPendapatan),
            icon: "💰",
            gradient: "from-emerald-500 to-green-600",
            bgGradient: "from-emerald-50 to-green-50",
            textColor: "text-emerald-700",
            iconBg: "bg-emerald-100",
            description: "Pendapatan keseluruhan"
        },
        {
            title: "Pendapatan Bulan Ini",
            value: formatCurrency(stats.pendapatanBulanIni),
            icon: "📊",
            gradient: "from-blue-500 to-cyan-600",
            bgGradient: "from-blue-50 to-cyan-50",
            textColor: "text-blue-700",
            iconBg: "bg-blue-100",
            description: "Pendapatan periode ini"
        },
        {
            title: "Total Transaksi",
            value: stats.totalTransaksi.toString(),
            icon: "📋",
            gradient: "from-purple-500 to-violet-600",
            bgGradient: "from-purple-50 to-violet-50",
            textColor: "text-purple-700",
            iconBg: "bg-purple-100",
            description: "Semua transaksi"
        },
        {
            title: "Transaksi Selesai",
            value: stats.transaksiSelesai.toString(),
            icon: "✅",
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
            textColor: "text-green-700",
            iconBg: "bg-green-100",
            description: "Transaksi diselesaikan"
        },
        {
            title: "Transaksi Proses",
            value: stats.transaksiProses.toString(),
            icon: "⏳",
            gradient: "from-amber-500 to-orange-600",
            bgGradient: "from-amber-50 to-orange-50",
            textColor: "text-amber-700",
            iconBg: "bg-amber-100",
            description: "Sedang diproses"
        },
        {
            title: "Transaksi Hari Ini",
            value: stats.transaksiHariIni.toString(),
            icon: "📅",
            gradient: "from-indigo-500 to-purple-600",
            bgGradient: "from-indigo-50 to-purple-50",
            textColor: "text-indigo-700",
            iconBg: "bg-indigo-100",
            description: "Transaksi hari ini"
        }
    ];

    return (
        <div className="mb-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        📊 Dashboard Statistik
                    </span>
                </h2>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">Live Data</span>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statistikCards.map((card, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${card.bgGradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 backdrop-blur-sm`}
                    >
                        {/* Card Header */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                                        {card.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        {card.description}
                                    </p>
                                    <p className={`text-2xl font-bold ${card.textColor} flex items-center`}>
                                        {card.value}

                                    </p>
                                </div>
                                <div className={`${card.iconBg} p-4 rounded-xl shadow-sm`}>
                                    <span className="text-3xl">{card.icon}</span>
                                </div>
                            </div>

                        </div>

                        {/* Card Footer */}
                        <div className={`px-6 py-3 bg-gradient-to-r ${card.gradient} rounded-b-xl`}>
                            <div className="flex items-center justify-between text-white">
                                <span className="text-sm font-medium opacity-90">
                                    Terakhir diperbarui
                                </span>
                                <span className="text-xs opacity-75">
                                    {new Date().toLocaleTimeString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Footer */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">Aktif</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">Proses</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">Selesai</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatistikPendapatan;