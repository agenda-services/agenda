import { generateAppointmentId } from "../shared/generator";
import { Appointment, AppointmentStatus } from "../models/appointment";

const getAppointments = async (account_id: string): Promise<Appointment[]> => {
  return (await Appointment.find({
    status: AppointmentStatus.Active,
    account_id
  })
    .sort({ date: -1 })
    .limit(10)
    .lean()) as Appointment[];
};

const getAppointment = async (
  appointment_id: string,
  account_id: string
): Promise<Appointment> => {
  return (await Appointment.findOne({
    appointment_id,
    account_id
  }).lean()) as Appointment;
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
    date: appointment.date,
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
