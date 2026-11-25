// Tarih yardımcıları: API'de "GG-AA-YYYY" (15-10-2026), veritabanında gerçek Date.
// Metin olarak saklasaydık "05-11-2026" < "15-10-2026" olurdu (Kasım Ekim'den önce
// sıralanırdı); Date olunca sort ve $gte tarihi tarih olarak karşılaştırır.

// "15-10-2026" → Date (UTC gece yarısı). Biçim yanlışsa Invalid Date döner,
// Mongoose bunu "Cast to date failed" hatasına çevirir → 400.
export function parseDate(value) {
  if (typeof value !== "string") return value;
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!m) return new Date(NaN); // biçim yanlış (ör. "2026-12-20")
  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));
  if (tarih.getUTCDate() !== gun || tarih.getUTCMonth() !== ay - 1)
    return new Date(NaN); // 31-02-2026 gibi olmayan gün
  return tarih;
}

// Date → "15-10-2026"
export function formatDate(tarih) {
  if (!(tarih instanceof Date)) return tarih;
  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  return `${gun}-${ay}-${tarih.getUTCFullYear()}`;
}

// Bugünün başı (UTC 00:00): /events/upcoming bugünü de dahil eder.
export function todayStart() {
  const s = new Date();
  return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
}
