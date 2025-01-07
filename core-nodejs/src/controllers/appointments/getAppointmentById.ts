import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { appointmentToResponse } from "../../models/appointment";
import { responseInternalError } from "../response";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: accountId } = (req as Record<string, any>).acount;

    const appointment = await appointmentsService.getAppointment(id, accountId);
    const person = await peopleService.getScheduledPersonById(
      appointment.person_id
    );

    return res
      .status(StatusCodes.OK)
      .json(appointmentToResponse(appointment, person));
  } catch (error) {
    responseInternalError(res);
  }
};
