import { Appointment } from "../../models/Appointment";
import useFetch from "../../shared/hooks/fetch";
import { AppointmentCard } from "./components/AppointmentCard";

const APPOINTMENTS_URL = "http://localhost:3000/api/v1/appointments/";

export const Appointments = () => {
  const { data, loading, error } = useFetch(APPOINTMENTS_URL);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Appointments is empty</p>;
  }

  return (
    <ul className="w-full flex flex-col gap-4">
      {(data as Appointment[]).map((appointment) => (
        <AppointmentCard appointment={appointment} />
      ))}
    </ul>
  );
};
