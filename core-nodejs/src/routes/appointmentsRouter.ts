import { Router } from "express";
import getAppointments from "../controllers/appointments/getAppointments";
import createAppointment from "../controllers/appointments/createAppointment";
import getAppointmentById from "../controllers/appointments/getAppointmentById";
import updateAppointment from "../controllers/appointments/updateAppointment";

export const appointmentsRouter = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointmentById);
appointmentsRouter.post("/", createAppointment);
appointmentsRouter.put("/:id", updateAppointment);
