Canlı: https://kampus-etkinlik-iota.vercel.app

# Kampüs Etkinlikleri

Cemal Tarlan · 2211012055

Fakültedeki seminer, atölye ve söyleşilerin listelendiği site. Sprint 1–3
ayrı klasörlerde durur; Sprint 4'ten beri React uygulaması `frontend/`
klasöründe gelişir. Güncel sürüm Sprint 5'tir.

## Klasörler

| Klasör | Sprint | İçerik |
|---|---|---|
| `sprint1/` | 1 | Yalnızca HTML: beş sayfa, semantik etiketler, label'lı formlar. |
| `sprint 2/` | 2 | Aynı beş sayfa, öğrenci numarasından gelen renk ve fontla CSS. |
| `sprint3/` | 3 | JavaScript: veri `data.js`'te, kartlar ondan üretilir; arama, kategori filtresi ve form kontrolü. |
| `frontend/` | 4–5 | Vite, TypeScript ve React. Sprint 4: tipli veri, saf fonksiyonlar, beş sayfa tek `App.tsx` içinde. Sprint 5: `App.tsx` props ile konuşan 8 bileşene bölündü. |
| `img/` | | Etkinlik afişleri. |

`frontend/` dosya açıklamaları ve bileşen ağacı [`frontend/README.md`](frontend/README.md) içinde.

## Çalıştırma

Sprint 1–3: ilgili klasördeki `index.html` dosyasını tarayıcıda açın.

Sprint 4–5:

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

## Yayınlama (Vercel)

- Root Directory: `frontend`
- Framework Preset: `Vite`

## Teslim etiketleri

`sprint-01`, `sprint-04`
