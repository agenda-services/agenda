import { Appointment, CreateAppointment } from "../../models/Appointment";

const APPOINTMENTS_URL = import.meta.env.VITE_APPOINTMENTS_URL;

export const updateAppointement = async (
  id: string,
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  const body = new URLSearchParams();

  if (appointment.date) body.set("date", appointment.date.toISOString());
  if (appointment.status) body.set("status", appointment.status);

  const req: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body
  };

  const response = await fetch(APPOINTMENTS_URL + id, req);
  console.log(response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  data.date = new Date(data.date);

  return data;
};

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
