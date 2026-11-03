import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

// Aynı form, iki sayfa: burada başlangıç değeri boş.
function AddEventPage() {
  const { addEvent } = useEvents();
  // useNavigate: koddan sayfa değiştirir; kayıttan sonra tabloya dön.
  const navigate = useNavigate();

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default AddEventPage;
