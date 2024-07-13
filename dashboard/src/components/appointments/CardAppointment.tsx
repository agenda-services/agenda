import { type Appointment } from "../../models/appointment";
import { getDateLocalTimeString } from "../../utils/date";
interface CardAppointmentProps {
  appointment: Appointment;
}

export default function CardAppointment({ appointment }: CardAppointmentProps) {
  return (
    <article className="grid grid-cols-[minmax(100px,_1fr)_1.5fr_1fr] items-center justify-items-center">
      <div className="flex flex-col justify-self-start text-ellipsis">
        <span className="text-xl font-bold">
          {appointment.client.firstName}
        </span>
        <span className="text-sm font-light">
          {appointment.client.lastName}
        </span>
      </div>
      <span>{getDateLocalTimeString(appointment.date)}</span>
      <span>{appointment.type}</span>
    </article>
  );
}
