import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import peopleService from "../services/peopleService";

export const getScheduledPerson = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(peopleService.getScheduledPeople());
};
