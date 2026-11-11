// Route: hangi adres hangi controller fonksiyonuna gider.
// "/" burada /events demek; önek app.js'teki app.use("/events", ...) ile verildi.
import { Router } from "express";
import { getEvents, getEventById, createEvent } from "../controllers/event-controller.js";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

export default router;
