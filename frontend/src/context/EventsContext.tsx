import { createContext, useContext, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";

// Birçok sayfanın ortak kullandığı liste ve onu değiştiren üç fonksiyon tek yerde.
interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent'e çevirir: metinler kırpılır, kontenjan sayıya döner.
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    image: data.image,
  };
}

// children: Provider'ın açılış ve kapanış etiketi arasındaki her şey (burada App).
export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // push, splice yok: eski diziyi değiştirirler, React farkı görmez.
  // Her işlem yeni bir dizi kurar.
  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data) : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// Kendi hook'umuz: useContext'i kısaltır, Provider unutulursa hemen hata verir.
export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("EventsProvider yok");
  return value;
}
