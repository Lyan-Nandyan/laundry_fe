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
                return 'bg-green-100 text-green-800';
            case 'Proses':
                return 'bg-yellow-100 text-yellow-800';
            case 'Menunggu':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaksi Terbaru</h3>
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaksi Terbaru</h3>
                <div className="text-center text-red-600 py-8">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Transaksi Terbaru</h3>
                <span className="text-sm text-gray-500">Total: {transaksi.length} transaksi</span>
            </div>
            
            {transaksi.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <p>Belum ada transaksi</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">No</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Pelanggan</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Layanan</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Berat (kg)</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaksi.slice(0, 10).map((t, index) => (
                                <tr key={t.id_transaksi} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-900">{index + 1}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        {t.pelanggan?.nama || "Data tidak tersedia"}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        {t.layanan?.nama_layanan || "Data tidak tersedia"}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{t.berat}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                                        {formatCurrency(t.total_harga)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(t.status)}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">
                                        {formatDate(t.tanggal)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TableTransaksi;