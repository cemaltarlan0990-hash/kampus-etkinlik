import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

// Giriş kontrolü yok: /admin doğrudan açılır (gerçek giriş Sprint 10'da).
function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) deleteEvent(id);
  }

  return (
    <>
      <h2 className="bolum-baslik">Yönetim</h2>
      <p>
        <Link className="dugme" to="/admin/new">
          + Yeni etkinlik
        </Link>
      </p>

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th scope="col">Etkinlik</th>
              <th scope="col">Tarih</th>
              <th scope="col">Kategori</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">
                  <Link to={`/events/${event.id}`}>{event.title}</Link>
                </td>
                <td data-baslik="Tarih">
                  <time dateTime={`${event.date}T${event.time}`}>{formatDate(event)}</time>
                </td>
                <td data-baslik="Kategori">{event.category}</td>
                <td className="islemler">
                  <Link className="dugme" to={`/admin/${event.id}/edit`}>
                    Düzenle
                  </Link>
                  <button type="button" className="buton-sil" onClick={() => handleDelete(event.id, event.title)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
