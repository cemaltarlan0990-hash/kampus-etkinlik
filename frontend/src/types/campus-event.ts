// Tarif (tip): bir etkinlik neye benzer?
// Kategori yalnız bu beş değerden biri olabilir (union type);
// başka bir şey yazılırsa TypeScript hata verir.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | "Futbol";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  description: string;
  image?: string; // afiş isteğe bağlı; yoksa detayda görünmez
}

// Formun tuttuğu veri: id yok (kaydederken verilir), input hep metin verdiği için
// kontenjan string, kategori seçilmemiş olabilir.
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Her alana en fazla bir hata mesajı.
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
