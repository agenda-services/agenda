import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import peopleService from "../../services/peopleService";
import { personToResponse } from "../../models/person";

export const getScheduledPerson = async (req: Request, res: Response) => {
  const people = await Promise.all(
    (await peopleService.getScheduledPeople()).map(personToResponse)
  );

  return res.status(StatusCodes.OK).json(people);
};
