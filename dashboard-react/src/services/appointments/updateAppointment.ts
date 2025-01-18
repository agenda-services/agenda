import { APPOINTMENTS_URL, fetchClient } from "..";
import { Appointment } from "../../models/Appointment";

export const updateAppointementService = async (
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

  const response = await fetchClient(APPOINTMENTS_URL + id, req);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  data.date = new Date(data.date);

  return data;
};
