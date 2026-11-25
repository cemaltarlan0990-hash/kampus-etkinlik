# Kampüs Etkinlikleri · Backend (Sprint 9)

Cemal Tarlan · 2211012055

Etkinlikleri JSON olarak veren Node + Express REST API. Veri MongoDB'de
(Atlas) duruyor: Mongoose ile `Event` modeli üzerinden okunur ve yazılır.
Sprint 9 ile API tam CRUD oldu: etkinlik güncellenir (PATCH), silinir
(DELETE), başlığa göre aranır (`?search=`) ve yaklaşan etkinlikler ayrı
listelenir (`/events/upcoming`). Tarihler API'de `GG-AA-YYYY` biçimindedir.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env içindeki MONGODB_URI'yi kendi bağlantı adresinle değiştir
npm run seed           # veritabanına 6 örnek etkinlik yazar (2'si geçmiş tarihli)
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
| GET | `/health` | Sunucu ayakta mı | 200 | — | Çalışıyor |
| GET | `/events` | Liste, tarihe göre sıralı. `?search=` başlıkta arar, `?category=` filtreler (ikisi birlikte de olur) | 200 | — | Çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | Çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Çalışıyor |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle, güncel kaydı döndür | 200 | 400, 404 | Çalışıyor |
| DELETE | `/events/:id` | Sil | 204 (gövde yok) | 404 | Çalışıyor |

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası.

- Biçimi geçersiz bir id (`/events/yok`) de, biçimi doğru ama kaydı olmayan
  (ya da silinmiş) bir id de her yerde **404** döner (500 değil).
- Tarih her yerde `"GG-AA-YYYY"`: `"15-10-2026"`. `"2026-10-15"` ya da
  `"31-02-2026"` gibi değerler POST'ta da PATCH'te de **400** döner.
- POST ve PATCH'te doğrulamayı schema yapar (PATCH'te `runValidators: true`);
  kurala uymayan veri **400** döner.
- PATCH'te boş body (`{}`) **400 · Body is empty**; `_id`, `createdAt`,
  `updatedAt`, `__v` değiştirilmeye çalışılırsa **400 · … cannot be changed**.
- `?search=` büyük/küçük harf ayırmaz (`atölye` → `Atölye` de bulunur);
  `( * ?` gibi işaretler kaçırılır, arama 500 vermez.
- Beklenmeyen hatalar **500 · Server error** döner, ayrıntı sadece terminalde
  kalır, sunucu çalışmaya devam eder. Bozuk JSON body **400 · Invalid JSON body**.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Eşleşmeyen her adres `404 · Route not found` döner.

### Örnek istekler

```http
GET    /events?search=atölye&category=Atölye
GET    /events/upcoming
PATCH  /events/6af57a006f13ad018f7b7a55   { "capacity": 55 }
DELETE /events/6af57a006f13ad018f7b7a55   → 204, gövde yok
```

### Etkinlik nesnesi

```json
{
  "_id": "6af57a006f13ad018f7b7a55",
  "title": "Arduino ile Akıllı Sera Atölyesi",
  "category": "Atölye",
  "capacity": 18,
  "date": "22-10-2026",
  "time": "10:30",
  "location": "Elektronik Laboratuvarı",
  "description": "...",
  "createdAt": "2026-11-25T07:30:00.000Z",
  "updatedAt": "2026-11-25T07:30:00.000Z",
  "__v": 0
}
```

### Schema kuralları (`src/models/event-model.js`)

| Alan | Kural |
|---|---|
| `title` | zorunlu, `trim`, 3–100 karakter |
| `category` | zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | sayı, en az 0, varsayılan 0 |
| `date` | zorunlu. Veritabanında gerçek `Date`; API'de `GG-AA-YYYY` (`set: parseDate`, `get: formatDate`) |
| `time`, `location` | metin, varsayılan `""` |
| `description` | `trim`, en fazla 500 karakter |
| — | `timestamps: true` → `createdAt`, `updatedAt`; `toJSON: { getters: true }`, `id: false` |

Tarih neden metin değil? `"05-11-2026"` metin olarak `"15-10-2026"`dan
küçüktür; Kasım Ekim'den önce sıralanırdı. `Date` olunca `sort` ve `$gte`
tarihi tarih olarak karşılaştırır, yanıtta yine `"05-11-2026"` görünür.

## Klasörler

| Dosya | İşi |
|---|---|
| `src/app.js` | Express uygulaması, middleware (cors, json), route'lar, 404 ve hata yakalayıcı |
| `src/server.js` | `.env`'i okur, veritabanına bağlanır, portu dinler |
| `src/config/database.js` | `connectDatabase()`: MONGODB_URI ile bağlanır |
| `src/utils/date.js` | `parseDate` (`"15-10-2026"` → Date), `formatDate` (Date → `"15-10-2026"`), `todayStart` |
| `src/models/event-model.js` | `Event` schema ve modeli (koleksiyon: `events`) |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider (`/upcoming`, `/:id`'den önce) |
| `src/controllers/event-controller.js` | `getEvents`, `getUpcomingEvents`, `getEventById`, `createEvent`, `updateEvent`, `deleteEvent` |
| `src/data/seed-events.js` | Seed için 6 örnek etkinlik (2'si geçmiş tarihli, id alanı yok) |
| `src/seed.js` | `npm run seed`: önce `deleteMany`, sonra `insertMany` |
| `requests/kampus-api.json` | Postman collection (v2.1): 19 istek, testleriyle |
| `requests/run-results.json` | Ders test collection'ının çalıştırma sonucu: 18 istek, 45 test, 0 hata (`newman run … --reporters cli,json --reporter-json-export requests/run-results.json`) |

## Test

Postman'de **Import** ile `requests/kampus-api.json` dosyasını açın. Önce
`npm run seed`, sonra `npm run dev` çalıştırın; collection'a sağ tık >
**Run collection** > **Run**. id'leri elle girmeniz gerekmez: 02 listedeki ilk
`_id`'yi `eventId`'ye, 05 yeni oluşan kaydın `_id`'sini `newId`'ye kaydeder.
PATCH ve DELETE bu yeni kayıtla çalışır, seed verisi bozulmaz; istediğiniz kadar
tekrar çalıştırabilirsiniz.

| # | İstek | Beklenen |
|---|---|---|
| 01 | GET `/health` | 200 · ok + student |
| 02 | GET `/events` | 200 · 6 kayıt, tarihler `GG-AA-YYYY` |
| 03 | GET `/events/{{eventId}}` | 200 · tek etkinlik |
| 04 | GET `/events/yok` | 404 · Event not found |
| 05 | POST `/events` (`date: "20-12-2026"`) | 201 · yanıtta `date: "20-12-2026"` |
| 06 | POST `/events` (sadece title) | 400 · category ve date zorunlu |
| 07 | POST `/events` (`date: "2026-12-20"`) | 400 · yanlış tarih biçimi |
| 08 | PATCH `{ "capacity": 55 }` | 200 · sadece capacity değişti |
| 09 | PATCH `{ "date": "25-12-2026" }` | 200 · yeni tarih |
| 10 | PATCH `{ "title": "  Yeni Başlık  " }` | 200 · trim: `"Yeni Başlık"` |
| 11 | PATCH `{}` | 400 · Body is empty |
| 12 | PATCH `{ "category": "Parti" }` | 400 · enum |
| 13 | PATCH `{ "_id": "abc" }` | 400 · _id cannot be changed |
| 14 | PATCH `/events/yok` | 404 · Event not found |
| 15 | GET `/events?search=atölye` | 200 · başlığında atölye geçenler |
| 16 | GET `/events?search=atölye&category=Atölye` | 200 · iki filtre birlikte |
| 17 | GET `/events/upcoming` | 200 · geçmiş tarihli yok, en yakın önce |
| 18 | DELETE `/events/{{newId}}` | 204 · gövde yok |
| 19 | Aynı DELETE bir daha | 404 |

Ders kontrolü (backend bir terminalde `npm run dev` ile açıkken, ikinci
terminalde, cmd ya da PowerShell):

```bat
cd backend
npm test
```

`npm test` = `npx -y newman run https://webdersi.vercel.app/test.json`
(newman kurulu değilse kendisi indirir). Hedef: 18 istek, 45 test, 0 hata.
newman global kuruluysa doğrudan `newman run https://webdersi.vercel.app/test.json`
da aynı sonucu verir.
