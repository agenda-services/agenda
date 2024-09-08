import { Router } from "express";
import { getScheduledPerson } from "../controllers/peopleController";

export const peopleRouter = Router();

peopleRouter.get("/", getScheduledPerson);
