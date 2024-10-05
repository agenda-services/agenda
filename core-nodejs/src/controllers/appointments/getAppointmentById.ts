import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import peopleService from "../../services/peopleService";
import { appointmentToResponse } from "../../models/appointment";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = await appointmentsService.getAppointment(id);
  const person = await peopleService.getScheduledPersonById(
    appointment.person_id
  );

  return res
    .status(StatusCodes.OK)
    .json(appointmentToResponse(appointment, person));
};
