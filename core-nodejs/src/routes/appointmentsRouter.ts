import { Router } from "express";
import { getAppointments } from "../controllers/appointmentsController";

export const appointmentsRouter = Router();

appointmentsRouter.get("/", getAppointments);
