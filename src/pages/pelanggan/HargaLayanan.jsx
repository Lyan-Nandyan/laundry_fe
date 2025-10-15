import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const HargaLayanan = () => {
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
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            <Header link="/petugas" title="Dashboard Petugas" />
            
            {/* Table Layanan */}
            <div style={{ maxWidth: 800, margin: "20px auto" }}>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Nama</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layanan.map((l) => (
                            <tr key={l.id_layanan}>
                                <td className="py-2 px-4 border-b border-gray-300">{l.nama_layanan}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{l.harga_per_kg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HargaLayanan;
