// Saf fonksiyonlar: girdi alır, sonuç döndürür, DOM'a ve dışarıdaki
// değişkenlere dokunmaz. Aynı girdi her zaman aynı sonucu verir.
import type { Category, CampusEvent } from "../types/campus-event";

// Başlıkta veya açıklamada metin arar. Türkçe İ/ı doğru küçülsün diye tr-TR.
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q),
  );
}

// "" ise hepsi, değilse yalnız o kategoridekiler.
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// Tek etkinlik ya da bulunamazsa undefined.
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
