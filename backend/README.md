# Kampüs Etkinlikleri · Backend (Sprint 7)

Cemal Tarlan · 2211012055

Etkinlikleri JSON olarak veren Node + Express REST API. Veri şimdilik
bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile
eklenenler kaybolur. Sprint 8'de MongoDB'ye taşınacak.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
|---|---|
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucu yeniden başlar |
| `npm start` | `node src/server.js` |

## Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port |

`.env` GitHub'a gitmez (`.gitignore`). Hangi değişkenlerin gerektiği
`.env.example` içinde.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Eşleşmeyen her adres `404 · Route not found` döner.

### Etkinlik nesnesi

```json
{
  "id": "event-2",
  "title": "Arduino ile Akıllı Sera",
  "category": "Atölye",
  "capacity": 18,
  "date": "2026-10-22",
  "time": "10:30",
  "location": "Elektronik Laboratuvarı",
  "description": "..."
}
```

## Klasörler

| Dosya | İşi |
|---|---|
| `src/app.js` | Express uygulaması, middleware (cors, json), route'ları bağlar |
| `src/server.js` | `.env`'i okur, portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür |
| `src/data/events.js` | Bellek içi 6 etkinlik |
| `requests/kampus-api.json` | Postman collection (v2.1): 6 test isteği |

## Test

Postman'de **Import** ile `requests/kampus-api.json` dosyasını açın; sunucu
çalışırken istekleri sırayla gönderin.

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt |
| 3 | GET `/events/event-2` | 200 · event-2 |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni id |
| 6 | POST `/events` (sadece title) | 400 · error |
