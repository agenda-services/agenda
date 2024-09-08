import appointmentsRepository from "../repositories/appointmentsRepository";
import { Appointment } from "./../models/appointment";
import { Person } from "../models/person";
import personService from "../services/peopleService";

const getAppointments = () => {
  return appointmentsRepository
    .getAppointments()
    .map((appointment: Appointment) => ({
      ...appointment,
      client: personService.getScheduledPersonById(appointment.person_id)
    }));
};

const createAppointment = (
  person: Partial<Person>,
  appointment: Partial<Appointment>
): Appointment => {
  const appointmentId = "";

  const personCreated = personService.createPerson(person);
  const appointmentCreated = appointment as Appointment;

  appointmentCreated.appointment_id = appointmentId;
  appointmentCreated.person_id = personCreated.person_id;

  appointmentCreated.created_at = new Date().toLocaleDateString();
  appointmentCreated.updated_at = new Date().toLocaleDateString();

  appointmentsRepository.saveAppointment(appointmentCreated);

  return appointmentCreated;
};

export default {
  getAppointments,
  createAppointment
};
