import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { EventsProvider } from "./context/EventsContext";

// BrowserRouter adres çubuğunu dinler; EventsProvider etkinlik listesini
// altındaki her bileşene (App ve bütün sayfalar) açar.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
);
