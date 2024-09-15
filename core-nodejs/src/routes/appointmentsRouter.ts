import { Router } from "express";
import getAppointments from "../controllers/appointments/getAppointments";
import createAppointment from "../controllers/appointments/createAppointment";

export const appointmentsRouter = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.post("/", createAppointment);
