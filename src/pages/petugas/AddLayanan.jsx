import React from "react";
import { API, cekStatus } from "../../api";
import { useState } from "react";
import Header from "../../components/Header";

const AddLayanan = () => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [status, setStatus] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        const res = await API.post("/layanan", {
            nama_layanan: nama,
            harga_per_kg: harga,
        });
        console.log(nama, harga);
        setStatus(await cekStatus(res, "Layanan berhasil ditambahkan"));
        window.location.replace("/petugas/layanan");
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header link="/petugas" title="Dashboard Petugas" />
            <div style={{ maxWidth: 420, margin: "40px auto" }}>
                <h2>Tambah Layanan</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Nama Layanan"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Harga"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                        required
                    />
                    <button type="submit" style={{ padding: "8px 16px" }}>
                        Simpan
                    </button>
                </form>
                {status && <p style={{ marginTop: 12 }}>{status}</p>}
            </div>
        </div>
    );
};
export default AddLayanan;