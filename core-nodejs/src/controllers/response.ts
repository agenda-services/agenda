import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const responseBadRequest = (res: Response, message: string) => {
  res.status(StatusCodes.BAD_REQUEST).json({ message });
};

export const responseInternalError = (res: Response) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "something wrong, please try again" });
};
