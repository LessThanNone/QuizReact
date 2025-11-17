export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">Pengenalan Rasa Kopi</h5>
            <p className="text-muted small">
              Jelajahi berbagai jenis kopi dan karakteristik uniknya.
            </p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold">Menu</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/" className="text-decoration-none mb-0">
                  Home
                </a>
              </li>
              <li>
                <a href="/kopi" className="text-decoration-none mb-0">
                  Daftar Kopi
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Informasi</h6>
            <p className="small mb-0">
              © 2025 Coffee Less. Semua hak dilindungi.
            </p>
          </div>
        </div>

        <hr className="bg-secondary my-3" />

        <div className="text-center">
          <p className="small mb-0">
            by Charless
          </p>
        </div>
      </div>
    </footer>
  );
}
