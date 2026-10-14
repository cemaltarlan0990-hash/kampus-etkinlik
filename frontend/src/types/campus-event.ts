// Tarif (tip): bir etkinlik neye benzer?
// Kategori yalnız bu dört değerden biri olabilir (union type);
// başka bir şey yazılırsa TypeScript hata verir.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

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
