import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import appointmentsService from "../../services/appointmentsService";
import {
  AppointmentStatus,
  appointmentToResponse
} from "../../models/appointment";
import {
  responseBadRequest,
  responseInternalError,
  responseNotFound
} from "../response";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: accountId } = (req as Record<string, any>).account;
    const { status, date } = req.body;

    if (status !== "" && !Object.values(AppointmentStatus).includes(status)) {
      return responseBadRequest(res, "invalid appointment status");
    }

    const appointment = await appointmentsService.getAppointment(id, accountId);

    if (!appointment) {
      return responseNotFound(res, "appointment not found");
    }

    if (status) {
      appointment.status = status;
    }

    if (date) {
      appointment.date = date;
    }

    const appointmentUpdated = await appointmentsService.updateAppointment(
      appointment
    );

    return res
      .status(StatusCodes.OK)
      .json(appointmentToResponse(appointmentUpdated, null));
  } catch (error) {
    responseInternalError(res);
  }
};
