// Express uygulaması: middleware'ler ve route'lar burada bağlanır.
// Portu dinlemek server.js'in işi.
import express from "express";
import cors from "cors";

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

// Eşleşen route yoksa: her hata aynı biçimde.
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
