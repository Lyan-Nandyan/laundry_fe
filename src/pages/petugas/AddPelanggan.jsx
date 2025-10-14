import React, { useState } from "react";
import { API, cekStatus } from "../../api";

const AddPelanggan = () => {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const res = await API.post("/pelanggan", { nama, no_hp: noHp });

    setStatus(await cekStatus(res, "Pelanggan berhasil ditambahkan"));
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Tambah Pelanggan</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
          required
        />
        <input
          type="text"
          placeholder="No. HP"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
          required
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Simpan
        </button>
      </form>
      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
};
export default AddPelanggan;
