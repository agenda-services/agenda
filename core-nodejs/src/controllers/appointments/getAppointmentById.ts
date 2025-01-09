import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { appointmentToResponse } from "../../models/appointment";
import { responseInternalError, responseNotFound } from "../response";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: accountId } = (req as Record<string, any>).account;

    const appointment = await appointmentsService.getAppointment(id, accountId);
    if (!appointment) {
      responseNotFound(res, "appointment not found");
      return;
    }

    const person = await peopleService.getScheduledPersonById(
      appointment.person_id
    );

    return res
      .status(StatusCodes.OK)
      .json(appointmentToResponse(appointment, person));
  } catch (error) {
    console.log(error);
    responseInternalError(res);
  }
};
