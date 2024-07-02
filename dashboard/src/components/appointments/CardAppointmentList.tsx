import { useStore } from "@nanostores/react";
import type { Appointment } from "../../models/appointment";
import { appointments } from "../../stores/appointmentStore.ts";
import CardAppointment from "./CardAppointment";

export default function CardAppointmentList() {
  const $appointments = useStore(appointments);

  return (
    <ul>
      {$appointments.map((appointment: Appointment, key: number) => (
        <li key={key} className="border-b-[1px] px-1 py-4 border-[#72D957]">
          <CardAppointment appointment={appointment} />
        </li>
      ))}
    </ul>
  );
}
