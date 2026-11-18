# Kampüs Etkinlikleri · Backend (Sprint 8)

Cemal Tarlan · 2211012055

Etkinlikleri JSON olarak veren Node + Express REST API. Sprint 8'den itibaren
veri MongoDB'de (Atlas) duruyor: Mongoose ile `Event` modeli üzerinden okunur
ve yazılır, sunucu kapanıp açılınca POST ile eklenen kayıtlar kaybolmaz.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env içindeki MONGODB_URI'yi kendi bağlantı adresinle değiştir
npm run seed           # veritabanına 6 örnek etkinlik yazar
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
|---|---|
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucu yeniden başlar |
| `npm start` | `node src/server.js` |
| `npm run seed` | `events` koleksiyonunu boşaltır, 6 örnek etkinliği yazar. Kaç kez çalışırsa çalışsın sonuç 6 kayıttır. |

Sunucu önce veritabanına bağlanır, sonra portu dinler. Bağlanamazsa hata
mesajını yazıp kapanır. Bağlanınca terminalde şu satır görünür:

```
MongoDB bağlandı (Atlas): ac-…mongodb.net/Cluster0
```

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/Cluster0` | MongoDB bağlantı adresi; sondaki `/Cluster0` veritabanı adı |

`.env` GitHub'a gitmez (`.gitignore`). Hangi değişkenlerin gerektiği
`.env.example` içinde. Gerçek Atlas adresi ve şifresi sadece `.env`'de durur;
koda, README'ye, Postman collection'ına yazılmaz.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi tarihe göre getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8 |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8 |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Sprint 8 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası.

- `/events/:id` için biçimi geçersiz bir id (`/events/yok`) de, biçimi doğru
  ama kaydı olmayan bir id de **404** döner (500 değil).
- POST'ta doğrulamayı schema yapar; kurala uymayan veri **400** döner.
- Beklenmeyen hatalar **500 · Server error** döner, ayrıntı sadece terminalde
  kalır, sunucu çalışmaya devam eder.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Eşleşmeyen her adres `404 · Route not found` döner.

### Etkinlik nesnesi

```json
{
  "_id": "6af57a006f13ad018f7b7a55",
  "title": "Arduino ile Akıllı Sera",
  "category": "Atölye",
  "capacity": 18,
  "date": "2026-10-22",
  "time": "10:30",
  "location": "Elektronik Laboratuvarı",
  "description": "...",
  "createdAt": "2026-11-18T07:30:00.000Z",
  "updatedAt": "2026-11-18T07:30:00.000Z",
  "__v": 0
}
```

### Schema kuralları (`src/models/event-model.js`)

| Alan | Kural |
|---|---|
| `title` | zorunlu, `trim`, 3–100 karakter |
| `category` | zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | sayı, en az 0, varsayılan 0 |
| `date` | zorunlu (`YYYY-MM-DD`) |
| `time`, `location` | metin, varsayılan `""` |
| `description` | `trim`, en fazla 500 karakter |
| — | `timestamps: true` → `createdAt`, `updatedAt` |

## Klasörler

| Dosya | İşi |
|---|---|
| `src/app.js` | Express uygulaması, middleware (cors, json), route'lar, 404 ve hata yakalayıcı |
| `src/server.js` | `.env`'i okur, veritabanına bağlanır, portu dinler |
| `src/config/database.js` | `connectDatabase()`: MONGODB_URI ile bağlanır |
| `src/models/event-model.js` | `Event` schema ve modeli (koleksiyon: `events`) |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, `Event.find / findById / create` ile yanıt döndürür |
| `src/data/seed-events.js` | Seed için 6 örnek etkinlik (id alanı yok) |
| `src/seed.js` | `npm run seed`: önce `deleteMany`, sonra `insertMany` |
| `requests/kampus-api.json` | Postman collection (v2.1): 6 test isteği |

## Test

Postman'de **Import** ile `requests/kampus-api.json` dosyasını açın. Önce
`npm run seed`, sonra `npm run dev` çalıştırın ve istekleri sırayla gönderin.
2. istek, listedeki ilk etkinliğin `_id`'sini `eventId` değişkenine kaydeder;
3. istek bu değişkeni kullanır.

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt (seed sonrası), her birinde `_id` ve `createdAt` |
| 3 | GET `/events/{{eventId}}` | 200 · tek etkinlik |
| 4 | GET `/events/yok` | 404 · Event not found |
| 5 | POST `/events` (tam body) | 201 · yeni `_id` ve `createdAt` |
| 6 | POST `/events` (sadece title) | 400 · category ve date zorunlu |

**Kalıcılık testi:** 5. isteği gönderin, terminalde Ctrl+C ile sunucuyu
durdurup `npm run dev` ile yeniden başlatın; `GET /events` 7 kayıt döner ve
yeni etkinlik listededir.
