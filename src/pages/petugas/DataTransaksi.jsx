import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const DataTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const res = await API.get("/transaksi/status/Proses");
                const data = await res.json();
                setTransaksi(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching transaksi:", error);
            }
        };

        fetchTransaksi();
    }, []);

    const handleSelesai = async (id) =>{
         if (!window.confirm("Apakah Anda yakin ingin menyelesaikan transaksi ini?")) return;
                try {
                    const res = await API.patch(`/transaksi/${id}`, { status: "Selesai" });
                    if (res.ok) {
                        //setTransaksi((prev) => prev.map((t) => (t.id_transaksi === id ? { ...t, status: "Selesai" } : t)));
                        setTransaksi((prev) => prev.filter((t) => t.id_transaksi !== id));
                        alert("berhasil mengubah status")
                    } else {
                        alert("Gagal menyelesaikan transaksi");
                    }
                } catch (error) {
                    console.error("Error deleting pelanggan:", error);
                }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header />
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <h2 className="text-2xl font-semibold mb-4">Data Transaksi</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">No</th>
                            <th className="py-2 px-4 border-b">Pelanggan</th>
                            <th className="py-2 px-4 border-b">Layanan</th>
                            <th className="py-2 px-4 border-b">Berat (kg)</th>
                            <th className="py-2 px-4 border-b">Total Harga</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.map((t, index) => (
                            <tr key={t.id_transaksi}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{t.pelanggan?.nama  || "Deleted"}</td>
                                <td className="py-2 px-4 border-b">{t.layanan?.nama_layanan || "Deleted"}</td>
                                <td className="py-2 px-4 border-b">{t.berat}</td>
                                <td className="py-2 px-4 border-b">{t.total_harga}</td>
                                <td className="py-2 px-4 border-b">{t.status}</td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <Link to={`/petugas/transaksi/${t.id_transaksi}`} className="text-blue-500 hover:underline mr-4">
                                        Edit
                                    </Link>
                                    <button className="text-green-500 hover:underline" onClick={() => handleSelesai(t.id_transaksi)}>
                                        Selesai
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTransaksi;
