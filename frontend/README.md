Canlı: https://kampus-etkinlik-iota.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite, TypeScript ve React)

Cemal Tarlan · 2211012055

Sprint 3'teki site React'e taşındı: veri tipli, fonksiyonlar saf, sayfalar JSX.
Beş sayfa tek `App.tsx` içinde; hangi sayfanın açık olduğunu state tutar
(React Router Sprint 6'da gelecek).

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
| `src/App.tsx` | Uygulamanın ana bileşeni; beş sayfa, menü, arama ve filtre state'i burada. |
| `src/App.css` | Sprint 3 CSS'i (renk ve font öğrenci numarasından). |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `CampusEvent` ve `Category` tipleri. |
| `src/data/events.ts` | Tipli 6 etkinlik (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar: `afis.svg`, `favicon.svg`. |

## Çalıştırma

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build → dist/
npm run preview
```
