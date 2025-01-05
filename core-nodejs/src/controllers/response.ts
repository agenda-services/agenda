import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const responseBadRequest = (res: Response, message: string) => {
  res.status(StatusCodes.BAD_REQUEST).json({ message });
};

export const responseNotFound = (res: Response, message: string) => {
  res.status(StatusCodes.BAD_REQUEST).json({ message });
};

export const responseInternalError = (res: Response) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "something wrong, please try again" });
};

export const responseUnauthorized = (res: Response) => {
  res.status(StatusCodes.UNAUTHORIZED).json({
    message: "Access denied. You are not authorized to access this resource."
  });
};

export const responseForbidden = (res: Response) => {
  res.status(StatusCodes.FORBIDDEN).json({
    message: "Invalid api key"
  });
};
