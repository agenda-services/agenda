import appointmentsRepository from "../repositories/appointmentsRepository";
import { Appointment } from "./../models/appointment";
import { Person } from "../models/person";
import personService from "../services/peopleService";

const getAppointments = async () => {
  return await appointmentsRepository.getAppointments();
};

const getAppointment = async (appointmentId: string) => {
  return await appointmentsRepository.getAppointment(appointmentId);
};

const createAppointment = async (
  person: Partial<Person>,
  appointment: Partial<Appointment>
): Promise<{ appointmentCreated: Appointment; personCreated: Person }> => {
  let personCreated = person as Person;

  if (!person._id) {
    personCreated = await personService.createPerson(person);
  }

  const appointmentToCreate = appointment as Appointment;

  appointmentToCreate.person_id = personCreated._id;

  const appointmentCreated = await appointmentsRepository.saveAppointment(
    appointmentToCreate
  );

  return { appointmentCreated, personCreated };
};

const updateAppointment = async (appointment: Appointment) => {
  return await appointmentsRepository.updateAppointment(appointment);
};

export default {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment
};
