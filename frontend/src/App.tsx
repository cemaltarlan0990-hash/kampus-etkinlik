import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

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

  return (
    <>
      <Header title={title} text={subtitle}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main className="kabuk">
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a
                className="dugme"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={eventCategories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && (
              <p className="sonuc" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}

            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
              columns={3}
            />
          </>
        )}

        {page === "detail" &&
          (selected ? (
            <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
          ) : (
            <>
              <div className="uyari-kutusu" role="alert">
                <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
              </div>
              <p>
                <a
                  className="dugme"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  &larr; Listeye dön
                </a>
              </p>
            </>
          ))}

        {/* key: Ekle ↔ Güncelle geçişinde form boş açılsın */}
        {(page === "add" || page === "update") && (
          <EventForm
            key={page}
            submitLabel={page === "update" ? "Güncelle" : "Kaydet"}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
