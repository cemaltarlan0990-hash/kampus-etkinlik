Canlı: https://kampus-etkinlik-iota.vercel.app

# Kampüs Etkinlikleri — Sprint 5 (React Bileşenleri)

Cemal Tarlan · 2211012055

Sprint 4'te beş sayfa tek `App.tsx` içindeydi. Sprint 5'te aynı site parçalara
bölündü: her parça kendi dosyasında bir bileşen, veriyi props ile alır, olayları
callback ile App'e bildirir. Ekran Sprint 4 ile aynıdır.

State (`page`, `selectedId`, `searchText`, `category`) App'te kalır; hangi
sayfanın açık olduğunu `page` tutar (React Router Sprint 6'da gelecek).

## Bileşen ağacı

```
App            state: page, selectedId, searchText, category
├── Header       title, text, children
│   └── Navigation   current, onNavigate
├── main (açık sayfa)
│   ├── EventFilter  searchText, category, categories, onSearchChange, onCategoryChange
│   ├── EventList    events, onShowDetail, emptyText, columns
│   │   └── EventCard    event, onShowDetail
│   ├── EventDetail  event, onBack, onEdit
│   └── EventForm    onSubmit, submitLabel
└── Footer       (props yok)
```

Veri aşağı (props), olay yukarı (callback): bileşenler state'i değiştirmez,
App'e haber verir; sayfayı App'teki `go()` değiştirir.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; ilk `npm install` ile oluşur. |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez (`.gitignore`). |
| `tsconfig*.json` | TypeScript ayarları: `tsconfig.app.json` uygulama için, `tsconfig.node.json` `vite.config.ts` için. |
| `vite.config.ts` | Vite ayarları; React eklentisi burada açılır. |
| `index.html` | Tek HTML sayfası; içinde React'in çizdiği boş `div#root` var. |
| `src/main.tsx` | React'i başlatır, `App`'i `#root`'a çizer. |
| `src/App.tsx` | Ana bileşen: state, hesaplanan değerler (`filtered`, `selected`, başlık), `go()` ve hangi sayfanın çizileceği. |
| `src/components/layout/Header.tsx` | Sayfa başlığı ve alt yazı; menüyü `children` olarak alır. |
| `src/components/layout/Navigation.tsx` | Menü; tıklanan sayfayı `onNavigate` ile bildirir. |
| `src/components/layout/Footer.tsx` | Alt bilgi; props'suz. |
| `src/components/events/EventCard.tsx` | Tek etkinlik kartı; "Detayları gör" → `onShowDetail(id)`. |
| `src/components/events/EventList.tsx` | Kart listesi (ana sayfa ve Etkinlikler); boşsa `emptyText` mesajı. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimi; değer props'tan, değişiklik callback ile. |
| `src/components/events/EventDetail.tsx` | Detay sayfası; `onBack` ve `onEdit` butonları. |
| `src/components/forms/EventForm.tsx` | Ekle/Güncelle formu; gönderimde `onSubmit`. |
| `src/App.css` | Sprint 3 CSS'i (renk ve font öğrenci numarasından). |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `CampusEvent` ve `Category` tipleri. |
| `src/types/page.ts` | `PageName` tipi (beş sayfanın adı). |
| `src/data/events.ts` | Tipli 6 etkinlik (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | `formatDate`: tarih ve saati "12 Ekim 2026, 14:00" biçimine çevirir. |
| `public/` | Olduğu gibi kopyalanan dosyalar: `afis.svg`, `favicon.svg`. |

## Çalıştırma

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build → dist/
npm run preview
```
