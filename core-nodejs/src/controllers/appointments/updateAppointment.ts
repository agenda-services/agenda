import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import {
  AppointmentStatus,
  appointmentToResponse
} from "../../models/appointment";
import { responseBadRequest, responseNotFound } from "../response";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(AppointmentStatus).includes(status)) {
    return responseBadRequest(res, "invalid appointment status");
  }

  const appointment = await appointmentsService.getAppointment(id);

  if (!appointment) {
    return responseNotFound(res, "appointment not found");
  }

  appointment.status = status;

  const appointmentUpdated = await appointmentsService.updateAppointment(
    appointment
  );

  return res
    .status(StatusCodes.OK)
    .json(appointmentToResponse(appointmentUpdated, null));
};