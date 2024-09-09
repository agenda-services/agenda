import { Appointment } from "../../../models/Appointment";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FunctionComponent<AppointmentCardProps> = ({
  appointment
}) => {
  return (
    <article className="w-full px-4 py-2 border border-green-700 rounded-md">
      <p className="flex flex-col gap-1 text-xl">
        {new Date(appointment.date).toLocaleDateString()}
        <small className="text-sm">{appointment.person.firstname}</small>
      </p>
    </article>
  );
};
