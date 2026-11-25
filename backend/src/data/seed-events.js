// Seed verisi: npm run seed bu 6 etkinliği veritabanına yazar.
// id alanı yok; MongoDB her kayda kendi _id'sini verir.
// category sadece schema'daki enum değerlerinden biri olabilir:
// Seminer, Atölye, Söyleşi, Yarışma
// Tarihler "GG-AA-YYYY". İlk ikisi geçmişte: /events/upcoming onları göstermez,
// /events gösterir; fark böyle görünür.
export const seedEvents = [
  {
    title: "Mezun Buluşması: İlk İşimde Ne Öğrendim?",
    category: "Seminer",
    capacity: 90,
    date: "14-10-2026",
    time: "13:30",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description:
      "Son üç yılın mezunları ilk iş yıllarını, mülakat deneyimlerini ve stajdan işe geçişi anlatıyor.",
  },
  {
    title: "Arduino ile Akıllı Sera Atölyesi",
    category: "Atölye",
    capacity: 18,
    date: "22-10-2026",
    time: "10:30",
    location: "Elektronik Laboratuvarı",
    description:
      "Nem ve sıcaklık sensörleriyle küçük bir sera modelini otomatik sulayan devre kuruyoruz.",
  },
  {
    title: "Açık Kaynak Projelere Nasıl Katkı Verilir?",
    category: "Söyleşi",
    capacity: 70,
    date: "03-12-2026",
    time: "15:00",
    location: "Kütüphane Etkinlik Salonu",
    description:
      "İlk pull request'ten bakımcı olmaya: issue seçmek, kod incelemesi ve topluluk kuralları.",
  },
  {
    title: "Figma ile Mobil Arayüz Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "09-12-2026",
    time: "14:00",
    location: "Bilgisayar Laboratuvarı 3",
    description:
      "Bir etkinlik uygulamasının üç ekranını bileşenler ve otomatik yerleşimle baştan tasarlıyoruz.",
  },
  {
    title: "Kampüs Kodlama Maratonu",
    category: "Yarışma",
    capacity: 60,
    date: "15-12-2026",
    time: "09:00",
    location: "Merkez Kafeterya Üst Kat",
    description:
      "Üç kişilik takımlarla 8 saatte kampüs yaşamını kolaylaştıran bir uygulama prototipi.",
  },
  {
    title: "İngilizce Pratik Etkinliği",
    category: "Söyleşi",
    capacity: 40,
    date: "10-12-2026",
    time: "18:00",
    location: "Bunno Cafe",
    description:
      "Beraber arkadaşlarınızla İngilizce konuşma pratiği yapılabilecek güzel bir etkinlik.",
  },
];
