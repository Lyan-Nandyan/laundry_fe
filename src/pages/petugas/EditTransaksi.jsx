import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const EditTransaksi = () => {
    const navigate = useNavigate();
    const [pelanggan, setPelanggan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id_pelanggan: "",
        id_layanan: "",
        berat: "",
    });
    useEffect(() => {
        // Fetch transaksi data from API
        const fetchTransaksi = async () => {
            try {
                const res = await API.get(`/transaksi/${id}`);
                const data = await res.json();
                const { id_pelanggan, id_layanan, berat } = data;
                setFormData({ id_pelanggan, id_layanan, berat });
            } catch (error) {
                console.error("Error fetching transaksi:", error);
            }
        };
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
        fetchTransaksi();
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
            const res = await API.put(`/transaksi/${id}`, formData);
            if (res.ok) {
                alert("Transaksi berhasil diperbarui");
                //navigasi ke halaman sebelumnya
                navigate(-1);
            } else {
                alert("Gagal memperbarui transaksi");
            }
        } catch (error) {
            console.error("Error updating transaksi:", error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pelanggan:</label>
                    <select
                        name="id_pelanggan"
                        value={formData.id_pelanggan}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Pelanggan</option>
                        {pelanggan.map((p) => (
                            <option key={p.id_pelanggan} value={p.id_pelanggan}>
                                {p.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Layanan:</label>
                    <select
                        name="id_layanan"   
                        value={formData.id_layanan}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Layanan</option>
                        {layanan.map((l) => (
                            <option key={l.id_layanan} value={l.id_layanan}>
                                {l.nama_layanan}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Berat (kg):</label>
                    <input
                        type="number"
                        name="berat"
                        value={formData.berat}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                    />
                </div>
                <button type="submit">Update Transaksi</button>
            </form>
        </div>
    );
}

export default EditTransaksi;