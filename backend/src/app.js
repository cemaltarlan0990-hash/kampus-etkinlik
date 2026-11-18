// Express uygulaması: middleware'ler ve route'lar burada bağlanır.
// Portu dinlemek server.js'in işi.
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors()); // frontend (5173) istek atabilsin
app.use(express.json()); // JSON body → req.body

// Sunucu ayakta mı? (route'lardan önce)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2211012055",
  });
});

app.use("/events", eventRoutes);

// Eşleşen route yoksa: her hata aynı biçimde.
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre olduğu için Express bunu hata middleware'i sayar.
// Controller'lardaki next(err) buraya gelir; sunucu çökmez.
app.use((err, req, res, next) => {
  // Bozuk JSON body (express.json ayrıştıramadı) kullanıcı hatasıdır: 400
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  // Ayrıntı sadece terminalde kalır, kullanıcıya genel mesaj gider.
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
