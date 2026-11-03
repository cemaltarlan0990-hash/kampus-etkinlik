import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();
  // Arama metnini sadece bu sayfa kullanıyor; state context'te değil burada.
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Kategori seçenekleri veriden; Set her birini bir kez tutar.
  const categories = [...new Set(events.map((e) => e.category))];

  // Filtreli liste state değil: her çizimde state'ten hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>

      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />

      {filtered.length > 0 && (
        <p className="sonuc" aria-live="polite">
          {filtered.length} etkinlik listeleniyor.
        </p>
      )}

      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." columns={3} />
    </>
  );
}

export default EventsPage;
