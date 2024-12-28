import { APPOINTMENTS_URL } from ".";
import { Appointment, CreateAppointment } from "../../models/Appointment";

export const createAppointmentService = async (
  appointment: CreateAppointment
): Promise<Appointment> => {
  const body = new URLSearchParams();

  body.set("firstname", appointment.firstname);
  body.set("lastname", appointment.lastname);
  body.set("date", appointment.date.toISOString());

  if (appointment.person_id) body.set("firstname", appointment.person_id);

  const req: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body
  };

  const response = await fetch(APPOINTMENTS_URL, req);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};
