// etkinlik-detay.html?id=event-3 → adresteki id ile etkinliği bulur ve gösterir.
import { events, tarihMetni } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

// Önce kontrol, sonra yaz: find bulamazsa undefined döner.
if (!event) {
  hataGoster();
} else {
  detayGoster(event);
}

function hataGoster() {
  baslik.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı";

  container.innerHTML = `
    <div class="uyari-kutusu" role="alert"><p></p></div>
    <p><a class="dugme" href="etkinlikler.html">&larr; Listeye dön</a></p>`;

  // id adresten geliyor; kullanıcının yazdığı metni HTML olarak değil,
  // düz metin olarak basıyoruz (textContent).
  container.querySelector(".uyari-kutusu p").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Adreste etkinlik numarası yok. Listeden bir etkinlik seçin.";
}

function detayGoster(event) {
  baslik.textContent = event.title;
  document.title = event.title;

  const [yil] = event.date.split("-");
  const adSatiri = event.title.replace(yil, "").trim();
  const kisaTarih = new Date(`${event.date}T${event.time}`).toLocaleDateString(
    "tr-TR",
    { day: "numeric", month: "long" }
  );
  const kontenjan = event.capacity ? `${event.capacity} kişi` : "Belirtilmedi";

  container.innerHTML = `
    <article class="detay">
      <div class="detay-govde">
        <figure class="afis">
          <div class="afis-kutu" aria-hidden="true">
            <span class="afis-ad">${adSatiri}</span>
            <span class="afis-yil">${yil}</span>
            <span class="afis-alt">${kisaTarih} · ${event.location}</span>
          </div>
          <figcaption>${event.title} afişi</figcaption>
        </figure>

        <section class="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd><time datetime="${event.date}T${event.time}">${tarihMetni(event)}</time></dd>
            <dt>Yer</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${kontenjan}</dd>
          </dl>
        </section>
      </div>

      <h2>Açıklama</h2>
      <p>${event.description}</p>

      <p class="dugmeler">
        <a class="dugme" href="etkinlikler.html">&larr; Listeye dön</a>
        <a class="dugme" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </p>
    </article>`;
}
