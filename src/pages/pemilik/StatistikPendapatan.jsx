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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const statistikCards = [
        {
            title: "Total Pendapatan",
            value: formatCurrency(stats.totalPendapatan),
            icon: "💰",
            color: "bg-green-500",
            textColor: "text-green-600"
        },
        {
            title: "Pendapatan Bulan Ini",
            value: formatCurrency(stats.pendapatanBulanIni),
            icon: "📊",
            color: "bg-blue-500",
            textColor: "text-blue-600"
        },
        {
            title: "Total Transaksi",
            value: stats.totalTransaksi.toString(),
            icon: "📋",
            color: "bg-purple-500",
            textColor: "text-purple-600"
        },
        {
            title: "Transaksi Selesai",
            value: stats.transaksiSelesai.toString(),
            icon: "✅",
            color: "bg-green-500",
            textColor: "text-green-600"
        },
        {
            title: "Transaksi Proses",
            value: stats.transaksiProses.toString(),
            icon: "⏳",
            color: "bg-yellow-500",
            textColor: "text-yellow-600"
        },
        {
            title: "Transaksi Hari Ini",
            value: stats.transaksiHariIni.toString(),
            icon: "📅",
            color: "bg-indigo-500",
            textColor: "text-indigo-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statistikCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                {card.title}
                            </p>
                            <p className={`text-2xl font-bold ${card.textColor}`}>
                                {card.value}
                            </p>
                        </div>
                        <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
                            <span className="text-2xl">{card.icon}</span>
                        </div>
                    </div>
                    
                    {/* Progress bar for visual appeal */}
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full ${card.color}`}
                                style={{ 
                                    width: `${Math.min(100, (parseInt(card.value.replace(/[^0-9]/g, '')) / 1000000) * 100 || 75)}%` 
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatistikPendapatan;