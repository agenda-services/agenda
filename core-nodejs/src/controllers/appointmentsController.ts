import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../services/appointmentsService";
import peopleService from "../services/peopleService";
import { Person } from "../models/person";
import { Appointment } from "../models/appointment";
import appointmentsRepository from "../repositories/appointmentsRepository";

export const getAppointments = (req: Request, res: Response) => {
  const appointments = appointmentsService.getAppointments();
  const appointmentsWithClients = appointments.map((appointment) => ({
    ...appointment,
    client: peopleService.getScheduledPersonById(appointment.person_id)
  }));

  return res.status(StatusCodes.OK).json(appointmentsWithClients);
};

export const createAppointment = (req: Request, res: Response) => {
  const data = req.body;

  const person: Partial<Person> = {
    firstname: data.firstname,
    lastname: data.lastname,
    phone_number: data.phone_number
  };

  const appointment: Partial<Appointment> = {
    date: data.date
  };

  const appointmentCreated = appointmentsService.createAppointment(
    person,
    appointment
  );

  return res.status(StatusCodes.OK).json({
    ...appointmentCreated,
    client: peopleService.getScheduledPersonById(appointmentCreated.person_id)
  });
};
