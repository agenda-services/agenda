import { generateAppointmentId } from "../shared/generator";
import { Appointment, AppointmentStatus } from "../models/appointment";

const getAppointments = async (): Promise<Appointment[]> => {
  return (await Appointment.find({ status: AppointmentStatus.Active })
    .sort({ date: -1 })
    .limit(10)
    .lean()) as Appointment[];
};

const getAppointment = async (appointmentId: string): Promise<Appointment> => {
  return (await Appointment.findById(appointmentId).lean()) as Appointment;
};

const saveAppointment = async (data: Appointment): Promise<Appointment> => {
  const appointmentToSave = new Appointment(data);

  appointmentToSave._id = generateAppointmentId();

  appointmentToSave.status = AppointmentStatus.Active;

  await appointmentToSave.save();

  return appointmentToSave as unknown as Appointment;
};

export const updateAppointment = async (
  appointment: Appointment
): Promise<Appointment> => {
  await Appointment.findByIdAndUpdate(appointment._id, {
    status: appointment.status,
    updated_at: new Date()
  });

  return appointment;
};

export default {
  getAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment
};
