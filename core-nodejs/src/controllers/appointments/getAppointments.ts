import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { appointmentToResponse } from "../../models/appointment";

export default async (req: Request, res: Response) => {
  const appointments = await appointmentsService.getAppointments();
  const appointmentsWithClients = await Promise.all(
    appointments.map(async (appointment) => {
      const person = await peopleService.getScheduledPersonById(
        appointment.person_id
      );

      return appointmentToResponse(appointment, person);
    })
  );

  return res.status(StatusCodes.OK).json(appointmentsWithClients);
};
