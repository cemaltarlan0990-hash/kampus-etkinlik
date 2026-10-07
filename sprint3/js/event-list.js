// index.html ve etkinlikler.html bu modülü kullanır.
// Fark container'daki data-limit işaretinden gelir:
//   varsa → tarihi en yakın N etkinlik (ana sayfa)
//   yoksa → hepsi + arama ve kategori filtresi (liste sayfası)
import { events, tarihMetni } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// Bir etkinlikten bir kart üretir (Sprint 2'deki .kart sınıfıyla).
function createCard(event) {
  const kontenjan = event.capacity ? `${event.capacity} kişi` : "Belirtilmedi";
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p class="etiket">${event.category}</p>
      <p>Tarih: <time datetime="${event.date}T${event.time}">${tarihMetni(event)}</time></p>
      <p>Yer: ${event.location}</p>
      <p>Kontenjan: ${kontenjan}</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  // sort asıl diziyi değiştirir; önce [...events] ile kopyalıyoruz.
  const yaklasan = [...events]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
  filtreyiKur();
}

// ---------------------------------------------------------------------
// Arama + kategori filtresi (yalnız etkinlikler.html'de form var)
// ---------------------------------------------------------------------
function filtreyiKur() {
  const form = document.querySelector("#filtre-formu");
  if (!form) return;

  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategoriler veriden üretilir; Set her birini yalnız bir kez tutar.
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriSecimi.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  // Türkçe İ/ı ve Â doğru küçülsün diye tr-TR kullanıyoruz.
  const kucult = (metin) => metin.toLocaleLowerCase("tr-TR");

  function filtrele() {
    const aranan = kucult(arama.value.trim());
    const kategori = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = kucult(`${e.title} ${e.category} ${e.description}`);
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = kategori === "" || e.category === kategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  // Enter'a basınca sayfa yenilenmesin.
  form.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
