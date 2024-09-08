import appointmentsRepository from "../repositories/appointmentsRepository";
import { Appointment } from "./../models/appointment";
import { Person } from "../models/person";
import personService from "../services/peopleService";

const getAppointments = async () => {
  return await appointmentsRepository.getAppointments();
};

const createAppointment = async (
  person: Partial<Person>,
  appointment: Partial<Appointment>
): Promise<{ appointmentCreated: Appointment; personCreated: Person }> => {
  let personCreated = person as Person;

  if (!person._id) {
    personCreated = await personService.createPerson(person);
  }

  const appointmentCreated = appointment as Appointment;

  appointmentCreated.person_id = personCreated._id;

  appointmentsRepository.saveAppointment(appointmentCreated);

  return { appointmentCreated, personCreated };
};

export default {
  getAppointments,
  createAppointment
};
