import React, { useRef } from "react";
import { Appointment } from "../../models/Appointment";
import { AppointmentForm } from "../../shared/components/AppointmentForm";
import { Input } from "../../shared/components/Input";
import { useAppointments } from "../../shared/hooks/appointments";
import { AppointmentCard } from "./components/AppointmentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Appointments = () => {
  const { data, loading, error, getAppointmentsList } = useAppointments();
  const nameInput = useRef(null);
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  if (isOpenForm) {
    return (
      <section className="w-full flex flex-col gap-2 items-start">
        <button
          type="button"
          onClick={() => setIsOpenForm(false)}
          className="w-[25px] h-[25px] grid place-content-center mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <AppointmentForm
          closeForm={() => setIsOpenForm(false)}
          getAppointments={getAppointmentsList}
          defaultFirstName={(nameInput.current?.value as string) || ""}
        />
      </section>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>No hay appointments</p>;
  }

  return (
    <section className="w-full flex flex-col gap-4">
      <form
        onSubmit={() => setIsOpenForm(true)}
        className="relative flex justify-between items-center gap-2"
      >
        <Input
          _ref={nameInput}
          className="px-4 py-2 top-0"
          placeholder="Agendar cita a..."
        />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Send
        </button>
      </form>
      <ul className="w-full flex flex-col gap-4">
        {(data as Appointment[]).map((appointment) => (
          <li key={appointment.id}>
            <AppointmentCard appointment={appointment} />
          </li>
        ))}
      </ul>
    </section>
  );
};
