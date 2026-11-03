import { useState, type ChangeEvent, type FormEvent } from "react";
import { categories } from "../../data/events";
import type { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  // Form kaydetmeyi bilmez; geçerli veriyi sayfaya verir, sayfa kaydeder.
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  // Controlled form: bütün alanların değeri tek state nesnesinde.
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handleChange bütün alanlara yeter: [e.target.name] anahtarın adını
  // değişkenden alır; name="title" ise data.title değişir.
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <section className="form-kutusu">
      {/* noValidate: tarayıcının balonları değil, validateEvent'in mesajları */}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <div className="alanlar">
          <p className="alan">
            <label htmlFor="title">Etkinlik Adı</label>
            <input
              type="text"
              id="title"
              name="title"
              maxLength={80}
              placeholder="Örn. Kariyer Günleri 2026"
              value={data.title}
              onChange={handleChange}
              aria-invalid={errors.title ? true : undefined}
            />
            <span className="hata-metni">{errors.title}</span>
          </p>
          <p className="alan">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              aria-invalid={errors.category ? true : undefined}
            >
              <option value="">Seçiniz</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="hata-metni">{errors.category}</span>
          </p>
          <p className="alan">
            <label htmlFor="date">Tarih</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              aria-invalid={errors.date ? true : undefined}
            />
            <span className="hata-metni">{errors.date}</span>
          </p>
          <p className="alan">
            <label htmlFor="time">Saat</label>
            <input
              type="time"
              id="time"
              name="time"
              value={data.time}
              onChange={handleChange}
              aria-invalid={errors.time ? true : undefined}
            />
            <span className="hata-metni">{errors.time}</span>
          </p>
          <p className="alan">
            <label htmlFor="location">Yer</label>
            <input
              type="text"
              id="location"
              name="location"
              maxLength={80}
              placeholder="Örn. A Blok Konferans Salonu"
              value={data.location}
              onChange={handleChange}
              aria-invalid={errors.location ? true : undefined}
            />
            <span className="hata-metni">{errors.location}</span>
          </p>
          <p className="alan">
            <label htmlFor="capacity">Kontenjan</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              min={1}
              max={1000}
              value={data.capacity}
              onChange={handleChange}
              aria-invalid={errors.capacity ? true : undefined}
            />
            <span className="hata-metni">{errors.capacity}</span>
          </p>
          <p className="alan">
            <label htmlFor="description">Açıklama</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={data.description}
              onChange={handleChange}
              aria-invalid={errors.description ? true : undefined}
            />
            <span className="hata-metni">{errors.description}</span>
          </p>
        </div>

        <div className="dugmeler">
          <button type="submit">{submitText}</button>
        </div>
      </form>
    </section>
  );
}

export default EventForm;
