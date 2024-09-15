import { generateAppointmentId } from "@/shared/generator";
import { Appointment, AppointmentStatus } from "../models/appointment";

const getAppointments = async (): Promise<Appointment[]> => {
  return await Appointment.find({});
};

const saveAppointment = async (data: Appointment): Promise<Appointment> => {
  const appointmentToSave = new Appointment(data);

  appointmentToSave._id = generateAppointmentId();

  appointmentToSave.status = AppointmentStatus.Active;

  appointmentToSave.created_at = new Date();
  appointmentToSave.updated_at = new Date();

  await appointmentToSave.save();

  return appointmentToSave as unknown as Appointment;
};

export default {
  getAppointments,
  saveAppointment
};
