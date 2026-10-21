import type { CampusEvent } from "../types/campus-event";

// "2026-10-12" + "14:00" → "12 Ekim 2026, 14:00"
export const formatDate = (e: CampusEvent) =>
  `${new Date(`${e.date}T${e.time}`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}, ${e.time}`;
