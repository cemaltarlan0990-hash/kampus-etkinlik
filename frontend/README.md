Canlı: https://cemaltarlan-frontend.vercel.app

# Kampüs Etkinlikleri — Sprint 6 + Vize (Router, Context ve Yönetim)

Cemal Tarlan · 2211012055

Sprint 5'te hangi sayfanın açık olduğunu App'teki `page` state'i tutuyordu.
Sprint 6'da her sayfanın gerçek bir adresi var (React Router); etkinlik listesi
ve onu değiştiren fonksiyonlar `EventsContext`'te. Yönetim sayfasından etkinlik
eklenir, güncellenir ve silinir; değişiklik bütün sayfalarda görünür.

Veri tarayıcı belleğinde tutulur: sayfa yenilenince liste başa döner
(backend Sprint 9'dan sonra gelecek).

## Kurulum

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build → dist/
npm run preview
```

## Route listesi

| Adres | Sayfa | İçerik |
|---|---|---|
| `/` | `HomePage` | Yaklaşan 2 etkinlik |
| `/events` | `EventsPage` | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | `EventDetailPage` | Etkinlik detayı; id yoksa "Sayfa bulunamadı" |
| `/login` | `LoginPage` | Giriş formu (e-posta, şifre) |
| `/register` | `RegisterPage` | Kayıt formu (ad soyad, e-posta, şifre ×2) |
| `/forgot-password` | `ForgotPasswordPage` | Şifre yenileme bağlantısı (demo) |
| `/admin` | `AdminPage` | Etkinlik tablosu: Düzenle, Sil (onaylı), Yeni etkinlik |
| `/admin/new` | `AddEventPage` | Boş form → `addEvent` |
| `/admin/:id/edit` | `EditEventPage` | Dolu form → `updateEvent` |
| `*` | `NotFoundPage` | Sayfa bulunamadı |

Giriş kontrolü yok: `/admin` doğrudan açılır. Giriş ve kayıt formları sadece
doğrulama yapar, bilgiler hiçbir yere gönderilmez (gerçek giriş Sprint 10'da).

## Bileşen ağacı

```
main.tsx
└── BrowserRouter
    └── EventsProvider      events, addEvent, updateEvent, deleteEvent
        └── App             state yok
            ├── Header
            ├── Navigation  NavLink (aktif sayfa aria-current="page")
            ├── Routes      → pages/ (10 sayfa, useEvents() ile veriye ulaşır)
            │   ├── EventsPage       state: searchText, category
            │   │   ├── EventFilter
            │   │   └── EventList → EventCard (Link)
            │   ├── EventDetailPage  useParams → EventDetail
            │   ├── AdminPage        tablo + deleteEvent
            │   └── Add/EditEventPage → EventForm (controlled, validateEvent)
            └── Footer
```

Sayfa (page) adrese bağlıdır ve veriyi bulur; bileşen (component) önüne konanı
çizer. Örneğin `EventDetailPage` id'yi okuyup etkinliği bulur, `EventDetail`
sadece gösterir.

## Klasör yapısı

```
src/
  components/
    layout/  Header Navigation Footer
    events/  EventCard EventList EventFilter EventDetail
    forms/   EventForm
  context/   EventsContext.tsx
  pages/     HomePage EventsPage EventDetailPage AdminPage AddEventPage
             EditEventPage LoginPage RegisterPage ForgotPasswordPage NotFoundPage
  data/      events.ts
  types/     campus-event.ts
  utils/     filter-events format-date validate-event
  App.tsx App.css index.css main.tsx
```

## Dosyalar

| Dosya | Görevi |
|---|---|
| `src/main.tsx` | React'i başlatır; App'i `BrowserRouter` ve `EventsProvider` ile sarar. |
| `src/App.tsx` | Kabuk: Header, Navigation, `Routes` (10 route), Footer. State yok. |
| `src/context/EventsContext.tsx` | Etkinlik listesi, `addEvent`, `updateEvent`, `deleteEvent` ve `useEvents()` hook'u. |
| `src/pages/*.tsx` | Adrese bağlı 10 sayfa. |
| `src/components/forms/EventForm.tsx` | Controlled form: tek `data` state'i, tek `handleChange`, gönderimde `validateEvent`; hata yoksa `onSubmit(data)`. |
| `src/utils/validate-event.ts` | Saf doğrulama: ad ≥ 3, kategori seçili, tarih/saat/yer dolu, kontenjan 1–1000 tam sayı, açıklama ≥ 10. |
| `src/types/campus-event.ts` | `CampusEvent`, `Category`, `EventFormData`, `EventFormErrors`. |
| `src/data/events.ts` | Başlangıçtaki 6 etkinlik ve kategori listesi. |
| `src/utils/filter-events.ts` | `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | Tarihi "12 Ekim 2026, 14:00" biçimine çevirir. |
| `src/App.css` | Öğrenci numarasından gelen renk ve font; Sprint 6'da tablo (telefonda kart) eklendi. |
| `vercel.json` | Her adresi `index.html`'e yönlendirir; `/events/event-2` yenilenince 404 vermez. |
| `public/` | `afis.svg`, `favicon.svg`. |
