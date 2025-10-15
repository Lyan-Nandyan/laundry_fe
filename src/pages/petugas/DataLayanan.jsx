import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const DataLayanan = () => {
    const [layanan, setLayanan] = useState([]);
    useEffect(() => {
        // Fetch layanan data from API
        const fetchLayanan = async () => {
            try {
                const res = await API.get("/layanan");
                const data = await res.json();
                setLayanan(Array.isArray(data) ? data : []);
                //cekStatus(res.status, "Data layanan berhasil dimuat");
            } catch (error) {
                console.error("Error fetching layanan data:", error);
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
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header link="/petugas" title="Dashboard Petugas" />
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <h2 className="text-2xl font-semibold mb-4">Daftar Layanan</h2>
                <Link to="/petugas/layanan/tambah" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
                    Tambah Layanan
                </Link>
            </div>
            {/* Table Layanan */}
            <div style={{ maxWidth: 800, margin: "20px auto" }}>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Nama</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Harga</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layanan.map((l) => (
                            <tr key={l.id_layanan}>
                                <td className="py-2 px-4 border-b border-gray-300">{l.id_layanan}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{l.nama_layanan}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{l.harga_per_kg}</td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <Link to={`/petugas/layanan/${l.id_layanan}`} className="text-blue-500 hover:underline mr-4">
                                        Edit
                                    </Link>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(l.id_layanan)}>
                                        Hapus
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

export default DataLayanan;
