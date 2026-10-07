// etkinlik-ekle.html ve etkinlik-guncelle.html bu dosyayı kullanır.
// Formdaki name'ler Türkçe (ad, tarih...), nesnenin alanları data.js ile aynı (title, date...).
// events, önce yüklenen data.js'ten gelir.

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";

// Kategori seçenekleri de veriden gelir; böylece değerler veriyle birebir aynı olur.
const kategoriler = [...new Set(events.map((e) => e.category))];
form.elements.kategori.innerHTML += kategoriler
  .map((k) => `<option value="${k}">${k}</option>`)
  .join("");

let etkinlik = null;

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (!etkinlik) {
    // id yoksa ya da yanlışsa boş form değil, uyarı gösterilir.
    form.outerHTML = `
      <div class="uyari-kutusu" role="alert">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
        detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <p><a class="dugme" href="etkinlikler.html">Etkinliklere git</a></p>`;
    document.querySelector("#form-aciklama")?.remove();
  } else {
    formuDoldur(etkinlik);
  }
}

if (document.body.contains(form)) {
  form.addEventListener("submit", gonder);
  // Düzeltilen alanın eski hatası, kullanıcı yazdıkça temizlensin.
  form.addEventListener("input", alanlariYenidenKontrolEt);
  form.addEventListener("change", alanlariYenidenKontrolEt);
}

// ---------------------------------------------------------------------

function formuDoldur(e) {
  const alan = form.elements;
  alan.ad.value = e.title;
  alan.kategori.value = e.category;
  alan.tarih.value = e.date;
  alan.saat.value = e.time;
  alan.yer.value = e.location;
  alan.kontenjan.value = e.capacity ?? "";
  alan.aciklama.value = e.description;
}

// FormData → data.js ile aynı alanlara sahip nesne
function formuOku() {
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();
  return {
    id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };
}

// Kurallar: hatası olan alanın name'i → gösterilecek metin
function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

// Her alanın altındaki hata yerini doldurur ya da temizler.
function hatalariGoster(errors) {
  for (const ad of ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"]) {
    const alan = form.elements[ad];
    const hataYeri = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      alan.setAttribute("aria-invalid", "true");
      hataYeri.textContent = errors[ad];
    } else {
      alan.removeAttribute("aria-invalid");
      hataYeri.textContent = "";
    }
  }
}

function gonder(e) {
  e.preventDefault(); // sayfa yenilenmesin, yazılanlar kaybolmasın
  form.dataset.gonderildi = "evet";

  const data = formuOku();
  console.log(data); // Adım 9: oluşan nesneyi konsolda gör
  const errors = dogrula(data);
  hatalariGoster(errors);

  if (Object.keys(errors).length > 0) {
    mesaj.className = "form-mesaj hata";
    mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  // Başarı: veri kaydedilmez (localStorage yok), sadece oluşan nesne gösterilir.
  mesaj.className = "form-mesaj basari";
  mesaj.innerHTML = "<p></p><pre></pre>";
  mesaj.querySelector("p").textContent = guncelleModu
    ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
    : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
  // Kullanıcının yazdığı metin textContent ile basılır; HTML olarak çalışmaz.
  mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
}

// İlk gönderimden sonra her değişiklikte hata metinlerini güncel tut.
function alanlariYenidenKontrolEt() {
  if (form.dataset.gonderildi !== "evet") return;
  hatalariGoster(dogrula(formuOku()));
}
