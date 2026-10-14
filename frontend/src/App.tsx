import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { categories, events } from "./data/events";
import type { Category, CampusEvent } from "./types/campus-event";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

// Router yok (Sprint 6'da gelecek): hangi sayfanın açık olduğunu bir state tutar.
type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// "2026-10-12" + "14:00" → "12 Ekim 2026, 14:00"
const formatDate = (e: CampusEvent) =>
  `${new Date(`${e.date}T${e.time}`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}, ${e.time}`;

// En yakın 2 etkinlik. sort asıl diziyi değiştirmesin diye önce kopya.
const upcoming = [...events]
  .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
  .slice(0, 2);

// Etkinlikler sayfasındaki kategori seçenekleri veriden; Set her birini bir kez tutar.
const eventCategories = [...new Set(events.map((e) => e.category))];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Link tıklanınca sayfa yenilenmesin, sadece state değişsin.
  function link(next: PageName, id: string | null = null) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      go(next, id);
    };
  }

  // Filtreli liste state değil: her çizimde state'ten hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  const subtitles: Partial<Record<PageName, string>> = {
    home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    events: "Ekim ve kasım aylarında kampüste düzenlenen etkinlikler.",
  };
  const subtitle = subtitles[page];

  // Side-effect: başlık değişince tarayıcı sekmesinin adı da değişsin.
  useEffect(() => {
    document.title = title === "Kampüs Etkinlikleri" ? title : `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Ana sayfa ve Etkinlikler aynı kartı kullanır; bir kez yazılır.
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="etiket">{event.category}</p>
        <p>
          Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event)}</time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={link("detail", event.id)}>
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <div className="kabuk">
          <h1>{title}</h1>
          {subtitle && <p className="alt-baslik">{subtitle}</p>}
          <nav className="menu">
            {menu.map((item) => (
              <a
                key={item.page}
                href="#"
                aria-current={page === item.page ? "page" : undefined}
                onClick={link(item.page)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="kabuk">
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="kartlar">{upcoming.map(renderCard)}</section>
            <p>
              <a className="dugme" href="#" onClick={link("events")}>
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <p className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {eventCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </form>

            <p className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kartlar uclu">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="uyari-kutusu" role="alert">
              <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <p>
              <a className="dugme" href="#" onClick={link("events")}>
                &larr; Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className={selected.image ? "detay-govde" : "detay-govde tek"}>
              {selected.image && (
                <figure className="afis">
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}

              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>{formatDate(selected)}</time>
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="dugmeler">
              <a className="dugme" href="#" onClick={link("events")}>
                &larr; Listeye dön
              </a>
              <a className="dugme" href="#" onClick={link("update", selected.id)}>
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p id="form-aciklama">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <section className="form-kutusu">
              {/* key: Ekle ↔ Güncelle geçişinde form boş açılsın */}
              <form key={page} className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="alanlar">
                  <p className="alan">
                    <label htmlFor="title">Etkinlik Adı</label>
                    <input type="text" id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
                  </p>
                  <p className="alan">
                    <label htmlFor="category">Kategori</label>
                    <select id="category" defaultValue="">
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
                    <input type="date" id="date" />
                  </p>
                  <p className="alan">
                    <label htmlFor="time">Saat</label>
                    <input type="time" id="time" />
                  </p>
                  <p className="alan">
                    <label htmlFor="location">Yer</label>
                    <input type="text" id="location" maxLength={80} placeholder="Örn. A Blok Konferans Salonu" />
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
                  <button type="submit">{page === "update" ? "Güncelle" : "Kaydet"}</button>
                </div>
              </form>
            </section>
          </>
        )}
      </main>

      <footer className="site-alt">
        <div className="kabuk">
          <p>Cemal Tarlan &middot; 2211012055 &middot; 2026</p>
        </div>
      </footer>
    </>
  );
}

export default App;
