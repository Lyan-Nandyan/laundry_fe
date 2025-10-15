import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EditLayananForm = () => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [status, setStatus] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`/layanan/${id}`);
                const data = await res.json();
                const { nama_layanan, harga_per_kg } = data;
                setNama(nama_layanan);
                setHarga(harga_per_kg);
            } catch (error) {
                console.error("Error fetching layanan:", error);
            }
        };

        fetchData();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        const res = await API.put(`/layanan/${id}`, { nama_layanan: nama, harga_per_kg: harga });
        setStatus(await cekStatus(res, "Layanan berhasil diupdate"));
        if (res.ok) {
            window.location.replace("/petugas/layanan");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header />
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nama:</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                </div>
                <div>
                    <label>Harga:</label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default EditLayananForm;
