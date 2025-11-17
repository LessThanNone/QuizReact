import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <p className="mb-1"><strong>Nama:</strong> Charless</p>
                <p className="mb-1"><strong>NIM:</strong> 535240068</p>
                <hr />
                <p className="mt-3">
                  <strong>Topik Project:</strong><br />
                  Pengenalan Rasa Kopi
                </p>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Web ini untuk mencatat berbagai jenis kopi yang ingin saya coba. 
                  Saya juga menambahkan notes rasa, aroma, acidity, dan metode seduh agar saya makin tahu tentang kopi.
                </p>
                <a href="/kopi" className="btn btn-dark w-100 mt-2">
                  Lihat List Kopi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
