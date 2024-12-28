import { APPOINTMENTS_URL } from ".";
import { Appointment } from "../../models/Appointment";

export const getAppointmentById = async (
  appointmentId: string
): Promise<Appointment> => {
  const response = await fetch(APPOINTMENTS_URL + appointmentId);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  data.date = new Date(data.date);

  return data;
};

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await fetch(APPOINTMENTS_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return await Promise.all(
    data.map((appointment: Appointment) => ({
      ...appointment,
      date: new Date(appointment.date)
    }))
  );
};
