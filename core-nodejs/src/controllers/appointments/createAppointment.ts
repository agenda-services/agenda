import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { Person } from "../../models/person";
import { Appointment, appointmentToResponse } from "../../models/appointment";
import { responseBadRequest, responseInternalError } from "../response";

const isADate = (date: string) => {
  const regex =
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(T|\s)?([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?Z?$/;
  return regex.test(date);
};

export default async (req: Request, res: Response) => {
  const data = req.body;

  if (!data.firstname) {
    return responseBadRequest(res, "missing firstname");
  }

  if (!data.date) {
    return responseBadRequest(res, "missing date");
  }
  if (!isADate(data.date)) {
    return responseBadRequest(res, "wrong date format");
  }

  let person: Partial<Person> | null = {
    firstname: data.firstname,
    lastname: data.lastname,
    phone_number: data.phone_number
  };

  if (data.person_id) {
    person = await peopleService.getScheduledPersonById(data.person_id);
  }

  if (!person) {
    return responseBadRequest(res, "person not found");
  }

  const appointment: Partial<Appointment> = {
    date: new Date(Date.parse(data.date))
  };

  try {
    const { appointmentCreated, personCreated } =
      await appointmentsService.createAppointment(person, appointment);

    return res
      .status(StatusCodes.OK)
      .json(appointmentToResponse(appointmentCreated, personCreated));
  } catch (error) {
    console.error(error);
    responseInternalError(res);
  }
};
