import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import Header from "../../components/Header";


const RiwayatTransaksi = () => {
    const [transaksi, setTransaksi] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    return;
                }

                // Decode token untuk mendapatkan username
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload.preferred_username);

                // Fetch transaksi pelanggan
                const res = await API.get("/transaksi/pelanggan?status=Diambil");
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    setTransaksi(data);
                } else {
                    setTransaksi([]);
                }
            } catch (error) {
                console.error("Error fetching transaksi:", error);
            }
        };

        fetchTransaksi();
    }, []);

    return (
        <div>
            <Header />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Riwayat Transaksi</h2>
                {user && <p className="mb-4">Pengguna: {user}</p>}

                {transaksi.length === 0 ? (
                    <p>Tidak ada transaksi</p>
                ) : (
                    <ul className="space-y-2">
                        {transaksi.map((item) => (
                            <li key={item.id_transaksi} className="border p-4 rounded">
                                <div><strong>Layanan:</strong> {item.Layanan?.nama_layanan || item.layanan?.nama_layanan || `ID: ${item.id_layanan}`}</div>
                                <div><strong>Status:</strong> {item.status}</div>
                                <div><strong>Berat:</strong> {item.berat} kg</div>
                                <div><strong>Total:</strong> Rp {item.total_harga?.toLocaleString('id-ID')}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RiwayatTransaksi;
