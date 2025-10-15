import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API, cekStatus } from "../../api";
import Header from "../../components/Header";

const DataPelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);

    useEffect(() => {
        // Fetch pelanggan data from API
        const fetchPelanggan = async () => {
            try {
                const res = await API.get("/pelanggan");
                const data = await res.json();
                setPelanggan(Array.isArray(data) ? data : []);
                //cekStatus(res.status, "Data pelanggan berhasil dimuat");
            } catch (error) {
                console.error("Error fetching pelanggan data:", error);
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
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header />
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <h2 className="text-2xl font-semibold mb-4">Daftar Pelanggan</h2>
                <Link to="/petugas/pelanggan/tambah" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
                    Tambah Pelanggan
                </Link>
            </div>

            {/* Table Pelanggan */}
            <div style={{ maxWidth: 800, margin: "20px auto" }}>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Nama</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">No. HP</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(pelanggan || []).map((p) => (
                            <tr key={p.id_pelanggan}>
                                <td className="py-2 px-4 border-b border-gray-300">{p.id_pelanggan}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{p.nama}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{p.no_hp}</td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(p.id_pelanggan)}>
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
export default DataPelanggan;
