import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

// Bu sprintte sadece sayfa: bilgiler hiçbir yere gönderilmez.
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      <h2 className="bolum-baslik">Giriş</h2>
      <section className="form-kutusu">
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="alanlar">
            <p className="alan">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? true : undefined}
              />
              <span className="hata-metni">{errors.email}</span>
            </p>
            <p className="alan">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={errors.password ? true : undefined}
              />
              <span className="hata-metni">{errors.password}</span>
            </p>
          </div>

          <div className="dugmeler">
            <button type="submit">Giriş yap</button>
          </div>
        </form>

        {sent && (
          <p className="form-mesaj basari" role="status">
            Bilgiler geçerli. Gerçek giriş Sprint 10'da.
          </p>
        )}

        <p className="form-baglantilar">
          <Link to="/forgot-password">Şifremi unuttum</Link>
          <Link to="/register">Kayıt ol</Link>
        </p>
      </section>
    </>
  );
}

export default LoginPage;
