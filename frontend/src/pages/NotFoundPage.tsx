import { Link } from "react-router-dom";

// "*" route'u ve bulunamayan etkinlik id'leri buraya düşer.
function NotFoundPage() {
  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <div className="uyari-kutusu" role="alert">
        <p>Aradığınız sayfa ya da etkinlik yok.</p>
      </div>
      <p className="dugmeler">
        <Link className="dugme" to="/">
          Ana Sayfa
        </Link>
        <Link className="dugme" to="/events">
          Etkinlikler
        </Link>
      </p>
    </>
  );
}

export default NotFoundPage;
