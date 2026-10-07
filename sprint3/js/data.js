// Bütün sayfalar etkinlikleri buradan okur. Veri tek yerde durur.
// Modül (import/export) yerine normal script: sayfa dosyaya çift tıklanarak
// (file://) açıldığında tarayıcı modülleri engelliyor. Bu dosya her sayfada
// diğer script'ten ÖNCE yüklenir; events ve tarihMetni ortak kullanılır.
// Tarih YYYY-AA-GG yazılır: bu biçim metin olarak sıralanınca
// takvim sırasıyla aynı sonucu verir (Adım 5'teki localeCompare için).
// Ekranda "12 Ekim 2026" olarak tarihMetni() ile gösterilir.

const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 120,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    capacity: 20,
    description: "Kendi robotunu kur, sensörlerle programla. Başlangıç seviyesi.",
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    capacity: 80,
    description: "Güvenli parola, kimlik avı ve kurumsal saldırı örnekleri.",
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Lab 1",
    capacity: 30,
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
  },
  {
    id: "event-5",
    title: "Yapay Zekâ ve Meslekler",
    category: "Seminer",
    date: "2026-11-10",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 150,
    description: "Üretken modellerin mühendislik işlerini nasıl değiştirdiği.",
  },
  {
    id: "event-6",
    title: "Kısa Film Gösterimi",
    category: "Söyleşi",
    date: "2026-11-18",
    time: "18:00",
    location: "Kültür Merkezi",
    capacity: 60,
    description: "Öğrenci filmlerinin gösterimi ve yönetmenlerle sohbet.",
  },
];

// "2026-10-12" + "14:00" → "12 Ekim 2026, 14:00"
// Tarih ve saat birlikte verilir; yalnız tarih verilirse tarayıcı onu
// UTC kabul eder ve bazı saat dilimlerinde bir gün kayabilir.
function tarihMetni(event) {
  const tarih = new Date(`${event.date}T${event.time || "00:00"}`);
  const gun = tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return event.time ? `${gun}, ${event.time}` : gun;
}
