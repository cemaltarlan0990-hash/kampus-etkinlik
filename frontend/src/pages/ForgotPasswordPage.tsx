import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

// Tek alan, tek hata metni. Backend gelince sadece "sent" kısmı gerçek isteğe dönüşecek.
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <section className="form-kutusu">
        <p>Hesabınıza bağlı e-posta adresini yazın; şifre yenileme bağlantısı gönderelim.</p>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="alanlar">
            <p className="alan">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
              />
              <span className="hata-metni">{error}</span>
            </p>
          </div>

          <div className="dugmeler">
            <button type="submit">Bağlantı gönder</button>
          </div>
        </form>

        {sent && (
          <p className="form-mesaj basari" role="status">
            Bağlantı {email} adresine gönderildi (demo).
          </p>
        )}

        <p className="form-baglantilar">
          <Link to="/login">&larr; Girişe dön</Link>
        </p>
      </section>
    </>
  );
}

export default ForgotPasswordPage;
