"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

type Kopi = {
    nama: string;
    notes: string;
    aroma: string;
    acidity: string;
    seduh: string;
};

export default function KopiPage() {
  const [kopiList, setKopiList] = useState<Kopi[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [form, setForm] = useState<Kopi>({
    nama: "",
    notes: "",
    aroma: "",
    acidity: "",
    seduh: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("kopiList");
    if (data) {
      try {
        setKopiList(JSON.parse(data));
      } catch (e) {
        console.error("Error loading data:", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("kopiList", JSON.stringify(kopiList));
    }
  }, [kopiList, mounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const aturAdd = () => {
    if (!form.nama.trim()) return alert("Nama kopi wajib diisi");
    setKopiList([...kopiList, form]);
    setForm({ nama: "", notes: "", aroma: "", acidity: "", seduh: "" });
  };

  const aturDelete = (index: number) => {
    setKopiList(kopiList.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 fw-bold">Pengenalan Rasa Kopi</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white">
          Tambah Kopi Baru
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nama Kopi</label>
            <input
              type="text"
              name="nama"
              className="form-control"
              placeholder="Cth: Arabika gayo, Arabika Toraja"
              value={form.nama}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Notes Rasa</label>
              <input
                type="text"
                name="notes"
                className="form-control"
                placeholder="Cth: Fruity, Caramel"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Aroma</label>
              <input
                type="text"
                name="aroma"
                className="form-control"
                placeholder="Cth: Floral, Chocolate"
                value={form.aroma}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Acidity</label>
              <input
                type="text"
                name="acidity"
                className="form-control"
                placeholder="Cth: Low, Medium, High"
                value={form.acidity}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Metode Seduh</label>
              <input
                type="text"
                name="seduh"
                className="form-control"
                placeholder="Cth: V60, Aeropress"
                value={form.seduh}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-dark w-100 mt-2" onClick={aturAdd}>
            Tambah Kopi +
          </button>
        </div>
      </div>
      <h4 className="mb-3 fw-bold">Daftar Kopi ({kopiList.length})</h4>

      {kopiList.length === 0 && (
        <p className="text-muted text-center">Belum ada data kopi.</p>
      )}

      <div className="row g-3">
        {kopiList.map((kopi, index) => (
          <div key={index} className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{kopi.nama}</h5>
                  <p className="text-muted mb-1 small">{kopi.notes}</p>
                </div>

                <div>
                  <Link
                    href={`/kopi/${index}`}
                    className="btn btn-sm btn-outline-dark me-2"
                    scroll={false}
                  >
                    Detail
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => aturDelete(index)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <Link href="/" className="btn btn-outline-secondary btn-sm">
          Kembali ke Home
        </Link>
      </div>
      </div>
      <Footer />
    </>
  );
}