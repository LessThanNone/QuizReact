"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

type Kopi = {
    nama: string;
    notes: string;
    aroma: string;
    acidity: string;
    seduh: string;
};

export default function DetailKopiPage() {
  const { id } = useParams();
  const [kopi, setKopi] = useState<Kopi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("kopiList");
    if (data) {
      try {
        const list: Kopi[] = JSON.parse(data);
        setKopi(list[Number(id)] || null);
      } catch (e) {
        console.error("Error loading data:", e);
      }
    }
    setLoading(false);
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

        <Link href="/kopi" className="btn btn-dark w-100 mt-2" scroll={false}>
          Kembali ke List Kopi
        </Link>
      </div>
    </div>
      <Footer />
    </>
  );
}