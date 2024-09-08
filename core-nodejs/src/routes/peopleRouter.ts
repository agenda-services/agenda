import { Router } from "express";
import { getScheduledPerson } from "../controllers/people/peopleController";

export const peopleRouter = Router();

peopleRouter.get("/", getScheduledPerson);
