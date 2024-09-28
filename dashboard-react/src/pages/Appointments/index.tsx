import React, { useRef } from "react";
import { Appointment } from "../../models/Appointment";
import { AppointmentForm } from "../../shared/components/AppointmentForm";
import { Input } from "../../shared/components/Input";
import { useAppointments } from "../../shared/hooks/appointments";
import { AppointmentCard } from "./components/AppointmentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Appointments = () => {
  const { appointments, loading, error, getAppointmentsList } =
    useAppointments();
  const nameInput = useRef<HTMLInputElement | null>(null);
  const [isOpenForm, setIsOpenForm] = React.useState(false);
  const [appointmentSelected, setAppointmentSelected] = React.useState("");

  const nameInputValue = nameInput.current?.value || "";

  const reprogram = (appointmentId: string) => {
    setAppointmentSelected(appointmentId);
    setIsOpenForm(true);
  };

  const closeForm = () => {
    setIsOpenForm(false);
    setAppointmentSelected("");
  };

  if (isOpenForm) {
    return (
      <section className="w-full flex flex-col gap-2 items-start">
        <button
          type="button"
          onClick={closeForm}
          className="w-[25px] h-[25px] grid place-content-center mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <AppointmentForm
          closeForm={closeForm}
          getAppointments={getAppointmentsList}
          defaultFirstName={nameInputValue}
          appointmentSelected={appointmentSelected}
        />
      </section>
    );
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

      {loading &&
        [1, 2].map(() => (
          <div className="animate-pulse border rounded-md p-4 border-gray-400">
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-60 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-40 mb-4"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}

      {error && (
        <p className="font-bold text-red-400 bg-red-100 p-4 rounded-md">
          {error}
        </p>
      )}

      <ul className="w-full flex flex-col gap-4 overflow-x-hidden">
        {appointments?.length === 0 ||
          (!appointments && !loading && <p>No hay appointments</p>)}
        {(appointments as Appointment[] | null)?.map((appointment) => (
          <li
            key={appointment.id}
            id={appointment.id}
            className="flex transition-all duration-[0.5s] ease-in-out"
          >
            <AppointmentCard appointment={appointment} reprogram={reprogram} />
          </li>
        ))}
      </ul>
    </section>
  );
};
