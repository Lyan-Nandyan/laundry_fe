import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const AddTransaksi = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const [formData, setFormData] = useState({
        id_pelanggan: "",
        id_layanan: "",
        berat: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch pelanggan data from API
        const fetchPelanggan = async () => {
            try {
                const res = await API.get("/pelanggan");
                const data = await res.json();
                setPelanggan(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching pelanggan:", error);
            }
        };

        // Fetch layanan data from API
        const fetchLayanan = async () => {
            try {
                const res = await API.get("/layanan");
                const data = await res.json();
                setLayanan(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching layanan:", error);
            }
        };

        fetchPelanggan();
        fetchLayanan();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/transaksi", formData);
            console.log("Transaksi berhasil ditambahkan:", response.data);
            navigate("/petugas");
        } catch (error) {
            console.error("Error adding transaksi:", error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header />
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <h2 className="text-2xl font-semibold mb-4">Tambah Transaksi</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Pelanggan</label>
                        <select
                            name="id_pelanggan"
                            value={formData.id_pelanggan}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Pilih Pelanggan</option>
                            {pelanggan.map((p) => (
                                <option key={p.id_pelanggan} value={p.id_pelanggan}>
                                    {p.nama} - {p.no_hp}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Layanan</label>
                        <select
                            name="id_layanan"
                            value={formData.id_layanan}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Pilih Layanan</option>
                            {layanan.map((l) => (
                                <option key={l.id_layanan} value={l.id_layanan}>
                                    {l.nama_layanan} - {l.harga_per_kg}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Berat (kg)</label>
                        <input
                            type="number"
                            name="berat"
                            value={formData.berat}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Tambah Transaksi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaksi;
