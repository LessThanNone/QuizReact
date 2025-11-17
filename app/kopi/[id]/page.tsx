"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

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

export default function DetailKopiPage() {
  const { id } = useParams();
  const [kopi, setKopi] = useState<Kopi | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<KopiForm>({ nama: '', notes: '', aroma: '', acidity: '', seduh: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/kopi/${id}`);
        if (!res.ok) {
          setKopi(null);
        } else {
          const data: Kopi = await res.json();
          setKopi(data);
          setForm({ nama: data.nama || '', notes: data.notes || '', aroma: data.aroma || '', acidity: data.acidity || '', seduh: data.seduh || '' });
        }
      } catch (e) {
        console.error('Error loading data:', e);
        setKopi(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (!kopi) {
    return (
      <>
        <div className="container mt-5">
          <h3>Kopi tidak ditemukan</h3>
          {errorMessage && <p className="text-danger">Error: {errorMessage}</p>}
          <Link href="/kopi" className="btn btn-dark mt-3" scroll={false}>
            Kembali
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card p-4 shadow-sm">
        {!editMode ? (
          <>
            <h3 className="mb-3">{kopi.nama}</h3>

            <div className="mb-2">
              <strong>Notes Rasa:</strong> {kopi.notes || "-"}
            </div>
            <div className="mb-2">
              <strong>Aroma:</strong> {kopi.aroma || "-"}
            </div>
            <div className="mb-2">
              <strong>Acidity:</strong> {kopi.acidity || "-"}
            </div>
            <div className="mb-2">
              <strong>Metode Seduh:</strong> {kopi.seduh || "-"}
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setEditMode(true)}>Edit</button>
              <Link href="/kopi" className="btn btn-dark ms-auto">Kembali ke List Kopi</Link>
            </div>
          </>
        ) : (
          <>
            <h4 className="mb-3">Edit Kopi</h4>
            <div className="mb-3">
              <label className="form-label">Nama Kopi</label>
              <input type="text" name="nama" className="form-control" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
            </div>

            <div className="mb-3">
              <label className="form-label">Notes Rasa</label>
              <input type="text" name="notes" className="form-control" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Aroma</label>
                <input type="text" name="aroma" className="form-control" value={form.aroma} onChange={(e) => setForm({ ...form, aroma: e.target.value })} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Acidity</label>
                <input type="text" name="acidity" className="form-control" value={form.acidity} onChange={(e) => setForm({ ...form, acidity: e.target.value })} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Metode Seduh</label>
              <input type="text" name="seduh" className="form-control" value={form.seduh} onChange={(e) => setForm({ ...form, seduh: e.target.value })} />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={async () => {
                if (!form.nama.trim()) return alert('Nama wajib diisi');
                setSaving(true);
                try {
                  const res = await fetch(`/api/kopi/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                  });
                  if (!res.ok) throw new Error('Gagal menyimpan');
                  const updated: Kopi = await res.json();
                  setKopi(updated);
                  setEditMode(false);
                } catch (e) {
                  console.error(e);
                  alert('Gagal menyimpan perubahan');
                } finally {
                  setSaving(false);
                }
              }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>

              <button className="btn btn-outline-secondary" onClick={() => { setEditMode(false); setForm({ nama: kopi.nama, notes: kopi.notes || '', aroma: kopi.aroma || '', acidity: kopi.acidity || '', seduh: kopi.seduh || '' }); }}>Batal</button>

              <button className="btn btn-danger ms-auto" onClick={async () => {
                if (!confirm(`Hapus kopi "${kopi.nama}"?`)) return;
                try {
                  const res = await fetch(`/api/kopi/${id}`, { method: 'DELETE' });
                  if (!res.ok && res.status !== 204) throw new Error('Gagal menghapus');
                  window.location.href = '/kopi';
                } catch (e) {
                  console.error(e);
                  alert('Gagal menghapus kopi');
                }
              }}>Hapus</button>
            </div>
          </>
        )}
      </div>
    </div>
      <Footer />
    </>
  );
}