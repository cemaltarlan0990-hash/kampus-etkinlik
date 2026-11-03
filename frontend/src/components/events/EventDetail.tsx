import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

// Etkinliği bulmak EventDetailPage'in işi; bileşen hazır etkinliği alır, id'yi değil.
// useParams yok, useEvents yok: sadece çizer.
interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      <div className={event.image ? "detay-govde" : "detay-govde tek"}>
        {event.image && (
          <figure className="afis">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <section className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>{formatDate(event)}</time>
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </section>
      </div>

      <h2>Açıklama</h2>
      <p>{event.description}</p>

      <p className="dugmeler">
        <Link className="dugme" to="/events">
          &larr; Listeye dön
        </Link>
        <Link className="dugme" to={`/admin/${event.id}/edit`}>
          Bu etkinliği güncelle
        </Link>
      </p>
    </article>
  );
}

export default EventDetail;
