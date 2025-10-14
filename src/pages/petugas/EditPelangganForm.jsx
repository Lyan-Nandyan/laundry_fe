import React from "react";
import { API, cekStatus } from "../../api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const EditPelangganForm = () => {
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [noHp, setNoHp] = useState("");
    const [status, setStatus] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`/pelanggan/${id}`);
                const data = await res.json();
                const { nama, no_hp } = data;
                setNama(nama);
                setNoHp(no_hp);
            } catch (error) {
                console.error("Error fetching pelanggan:", error);
            }
        };

        fetchData();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        const res = await API.put(`/pelanggan/${id}`, { nama, no_hp: noHp });
        setStatus(await cekStatus(res, "Pelanggan berhasil diupdate"));
        if (res.ok) {
            navigate("/petugas/pelanggan");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 animate-fade-in">
            {/* Header */}
            < div className="flex justify-between items-center mb-8" >
                <h1 className="text-3xl font-bold text-gray-800">Data Pelanggan</h1>
                <LogoutButton />
            </div >
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
                    <label>No HP:</label>
                    <input
                        type="text"
                        value={noHp}
                        onChange={(e) => setNoHp(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default EditPelangganForm;
