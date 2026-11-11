// Bellek içi etkinlik dizisi. Sunucu yeniden başlayınca POST ile
// eklenenler kaybolur; Sprint 8'de MongoDB'ye taşınacak.
// Afişler (image) frontend'de kaldı, burada yok.
export const events = [
  {
    id: "event-1",
    title: "Mezun Buluşması: İlk İşimde Ne Öğrendim?",
    category: "Seminer",
    capacity: 90,
    date: "2026-10-14",
    time: "13:30",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description:
      "Son üç yılın mezunları ilk iş yıllarını, mülakat deneyimlerini ve stajdan işe geçişi anlatıyor.",
  },
  {
    id: "event-2",
    title: "Arduino ile Akıllı Sera",
    category: "Atölye",
    capacity: 18,
    date: "2026-10-22",
    time: "10:30",
    location: "Elektronik Laboratuvarı",
    description:
      "Nem ve sıcaklık sensörleriyle küçük bir sera modelini otomatik sulayan devre kuruyoruz.",
  },
  {
    id: "event-3",
    title: "Açık Kaynak Projelere Nasıl Katkı Verilir?",
    category: "Söyleşi",
    capacity: 70,
    date: "2026-10-29",
    time: "15:00",
    location: "Kütüphane Etkinlik Salonu",
    description:
      "İlk pull request'ten bakımcı olmaya: issue seçmek, kod incelemesi ve topluluk kuralları.",
  },
  {
    id: "event-4",
    title: "Figma ile Mobil Arayüz Tasarımı",
    category: "Atölye",
    capacity: 25,
    date: "2026-11-05",
    time: "14:00",
    location: "Bilgisayar Laboratuvarı 3",
    description:
      "Bir etkinlik uygulamasının üç ekranını bileşenler ve otomatik yerleşimle baştan tasarlıyoruz.",
  },
  {
    id: "event-5",
    title: "Kampüs Kodlama Maratonu",
    category: "Yarışma",
    capacity: 60,
    date: "2026-11-21",
    time: "09:00",
    location: "Merkez Kafeterya Üst Kat",
    description:
      "Üç kişilik takımlarla 8 saatte kampüs yaşamını kolaylaştıran bir uygulama prototipi.",
  },
  {
    id: "event-6",
    title: "Fakülteler Arası Futbol Turnuvası Finali",
    category: "Futbol",
    capacity: 300,
    date: "2026-12-02",
    time: "16:00",
    location: "Kampüs Spor Sahası",
    description:
      "Mühendislik ve İktisat fakülteleri kupayı kaldırmak için karşı karşıya. Tribün herkese açık.",
  },
];
