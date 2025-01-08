import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import peopleService from "../../services/peopleService";
import { personToResponse } from "../../models/person";
import { responseInternalError } from "../response";

export const getScheduledPerson = async (req: Request, res: Response) => {
  try {
    const { id: accountId } = (req as Record<string, any>).account;

    const people = await Promise.all(
      (await peopleService.getScheduledPeople(accountId)).map(personToResponse)
    );

    return res.status(StatusCodes.OK).json(people);
  } catch (error) {
    responseInternalError(res);
  }
};
