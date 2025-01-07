import appointmentsRepository from "../repositories/appointmentsRepository";
import { Appointment } from "./../models/appointment";
import { Person } from "../models/person";
import personService from "../services/peopleService";

const errMissingAccountId = Error("missing account id");

const getAppointments = async (accountId: string) => {
  if (!accountId) throw errMissingAccountId;

  return await appointmentsRepository.getAppointments(accountId);
};

const getAppointment = async (appointmentId: string, accountId: string) => {
  return await appointmentsRepository.getAppointment(appointmentId, accountId);
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
