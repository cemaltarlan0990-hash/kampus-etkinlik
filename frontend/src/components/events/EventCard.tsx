import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

// Ana sayfa ve Etkinlikler aynı kartı kullanır. key burada değil, listeyi çizen yerde.
function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p className="etiket">{event.category}</p>
      <p>
        Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event)}</time>
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}

export default EventCard;
