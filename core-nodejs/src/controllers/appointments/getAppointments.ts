import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { appointmentToResponse } from "../../models/appointment";
import { responseInternalError } from "../response";

export default async (req: Request, res: Response) => {
  try {
    const { id } = (req as Record<string, any>).account;
    const appointments = await appointmentsService.getAppointments(id);
    const appointmentsWithClients = await Promise.all(
      appointments.map(async (appointment) => {
        const person = await peopleService.getScheduledPersonById(
          appointment.person_id
        );

        return appointmentToResponse(appointment, person);
      })
    );

    return res.status(StatusCodes.OK).json(appointmentsWithClients);
  } catch (error) {
    console.log(error);
    responseInternalError(res);
  }
};
