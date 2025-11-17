"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

type Kopi = {
  id: number;
  nama: string;
  notes?: string;
  aroma?: string;
  acidity?: string;
  seduh?: string;
  createdAt?: string;
  updatedAt?: string;
};

type KopiForm = {
  nama: string;
  notes?: string;
  aroma?: string;
  acidity?: string;
  seduh?: string;
};

export default function KopiPage() {
  const [kopiList, setKopiList] = useState<Kopi[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState<KopiForm>({
    nama: "",
    notes: "",
    aroma: "",
    acidity: "",
    seduh: "",
  });

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/kopi');
        if (!res.ok) throw new Error('Gagal memuat daftar kopi');
        const data: Kopi[] = await res.json();
        setKopiList(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof KopiForm;
    setForm({ ...form, [name]: e.target.value });
  };

  const aturAdd = async () => {
    if (!form.nama.trim()) return alert("Nama kopi wajib diisi");
    setSaving(true);
    try {
      const res = await fetch('/api/kopi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Gagal menambah kopi');
      }
      const created: Kopi = await res.json();
      setKopiList((s) => [created, ...s]);
      setForm({ nama: '', notes: '', aroma: '', acidity: '', seduh: '' });
    } catch (e) {
      console.error(e);
      alert('Gagal menambah kopi');
    } finally {
      setSaving(false);
    }
  };

  const aturDelete = async (index: number) => {
    const item = kopiList[index];
    if (!item) return;
    if (!confirm(`Hapus kopi "${item.nama}"?`)) return;
    try {
      const res = await fetch(`/api/kopi/${item.id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Gagal menghapus');
      setKopiList((s) => s.filter((_, i) => i !== index));
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus kopi');
    }
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

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : kopiList.length === 0 ? (
        <p className="text-muted text-center">Belum ada data kopi.</p>
      ) : null}

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
                  <Link href={`/kopi/${kopi.id}`} className="btn btn-sm btn-outline-dark me-2" scroll={false}>
                    Detail
                  </Link>

                  <button className="btn btn-sm btn-danger" onClick={() => aturDelete(index)}>
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