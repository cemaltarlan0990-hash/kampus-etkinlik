import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

// Sayfa bulur, EventDetail çizer.
function EventDetailPage() {
  const { id } = useParams(); // 1. adres: /events/event-2 → id = "event-2"
  const { events } = useEvents(); // 2. veri
  // useParams'ın tipi string | undefined; undefined gelirse boş metin.
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />; // 3. yoksa

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;
