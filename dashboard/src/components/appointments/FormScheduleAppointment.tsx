import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { useRef, useState, type FormEvent } from "react";
import { client } from "../../stores/clientStore";
import { appointments } from "../../stores/appointmentStore";
import type { Appointment } from "../../models/appointment";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

interface FormData {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  cellphone: string;
}

export default function FormSchedule() {
  const $client = useStore(client);
  const $appointments = appointments.get();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({
    date,
    time,
    firstName,
    lastName,
    cellphone
  }: FormData) => {
    const actualDate = new Date(date);
    const [hour, minutes] = time.split(":");
    actualDate.setHours(parseInt(hour));
    actualDate.setMinutes(parseInt(minutes));

    const appointment: Partial<Appointment> = {
      client: {
        firstName: firstName || "",
        lastName: lastName || "",
        cellphone: cellphone || ""
      },
      date: actualDate,
      hasPayment: false,
      services: [],
      type: "personal"
    };

    $appointments.push(appointment as Appointment);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
      <label htmlFor="firstName" className="flex flex-col mb-2 text-sm">
        <span className="mb-2 font-bold">Nombres:</span>
        <input
          defaultValue={$client.firstName}
          {...register("firstName")}
          type="text"
          id="firstName"
          className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2"
          placeholder="Susana Maria"
          required
        />
      </label>

      <label htmlFor="lastName" className="flex flex-col mb-2 text-sm">
        <span className="mb-2 font-bold">Apellidos:</span>
        <input
          {...register("lastName")}
          type="text"
          id="lastName"
          className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2"
          placeholder="Jimenez Diaz"
          defaultValue={$client.lastName}
          required
        />
      </label>

      <label htmlFor="cellphone" className="flex flex-col mb-2 text-sm">
        <span className="mb-2 font-bold">Teléfono celular:</span>
        <input
          {...register("cellphone")}
          type="text"
          id="cellphone"
          className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2"
          defaultValue={$client.cellphone}
          required
        />
      </label>

      <section className="flex flex-wrap gap-2 mb-2">
        <label htmlFor="date" className="flex flex-col text-sm">
          <span className="mb-2 font-bold">Fecha:</span>
          <input
            {...register("date")}
            type="date"
            id="date"
            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2"
            placeholder="Jimenez Diaz"
            required
          />
        </label>

        <label htmlFor="time" className="flex flex-col mb-2 text-sm">
          <span className="mb-2 font-bold">Hora:</span>
          <input
            {...register("time")}
            type="time"
            id="time"
            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2"
            required
          />
        </label>
      </section>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Schedule person
      </button>
    </form>
  );
}
