import appointments from "../data/appointments";
import { Appointment } from "../models/appointment";

const getAppointments = (): Appointment[] => {
  return appointments;
};

const saveAppointment = (appointment: Appointment) => {
  appointments.push(appointment);
};

export default {
  getAppointments,
  saveAppointment
};
