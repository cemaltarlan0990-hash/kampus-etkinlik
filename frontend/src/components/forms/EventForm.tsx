import { categories } from "../../data/events";

interface EventFormProps {
  // Form ne yapılacağını bilmez; Sprint 6'da App gerçek kaydetme fonksiyonunu verecek.
  onSubmit: () => void;
  submitLabel?: string;
}

function EventForm({ onSubmit, submitLabel = "Kaydet" }: EventFormProps) {
  return (
    <>
      <p id="form-aciklama">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

      <section className="form-kutusu">
        {/* required: Kaydet'e basınca boş kalan alanları tarayıcı işaretler,
            App.css :user-invalid ile kırmızı gösterir. State yok. */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="alanlar">
            <p className="alan">
              <label htmlFor="title">Etkinlik Adı</label>
              <input type="text" id="title" required minLength={3} maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
            </p>
            <p className="alan">
              <label htmlFor="category">Kategori</label>
              <select id="category" required defaultValue="">
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </p>
            <p className="alan">
              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" required />
            </p>
            <p className="alan">
              <label htmlFor="time">Saat</label>
              <input type="time" id="time" required />
            </p>
            <p className="alan">
              <label htmlFor="location">Yer</label>
              <input type="text" id="location" required maxLength={80} placeholder="Örn. A Blok Konferans Salonu" />
            </p>
            <p className="alan">
              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" min={1} max={1000} />
            </p>
            <p className="alan">
              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} />
            </p>
          </div>

          <div className="dugmeler">
            <button type="submit">{submitLabel}</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EventForm;
