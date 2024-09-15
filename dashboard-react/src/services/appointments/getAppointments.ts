import { Appointment, CreateAppointment } from "../../models/Appointment";

const APPOINTMENTS_URL = "http://localhost:3000/api/v1/appointments/";

export const getAppointments = async (): Promise<Appointment[]> => {
  return await (await fetch(APPOINTMENTS_URL)).json();
};

export const createAppointmentService = async (
  appointment: CreateAppointment
): Promise<Appointment> => {
  const body = new URLSearchParams();

  body.set("firstname", appointment.firstname);
  body.set("lastname", appointment.lastname);
  body.set("date", appointment.date.toISOString());

  console.log(body.get("date"));
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
