import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  // Ana sayfa 2, Etkinlikler 3 sütun (geniş ekranda).
  columns?: 2 | 3;
}

function EventList({ events, emptyText = "Etkinlik bulunamadı.", columns = 2 }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="sonuc" aria-live="polite">
        {emptyText}
      </p>
    );
  }

  return (
    <section className={columns === 3 ? "kartlar uclu" : "kartlar"}>
      {/* key: index değil id; filtre değişince sıra değişir. */}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
