import {
  responseForbidden,
  responseUnauthorized
} from "../controllers/response";
import { getClaims } from "../services/authorizerService";
import { AGENDA_API_KEY } from "../shared/constants";
import { NextFunction, Request, Response } from "express";
import { getAccountById } from "../services/accountsService";

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers[AGENDA_API_KEY] as string;
  if (!token) {
    token = req.cookies[AGENDA_API_KEY];
  }

  if (!token) {
    responseUnauthorized(res);
    return;
  }

  try {
    (req as Record<string, any>).account = getClaims(token);
    if ((req as Record<string, any>).account.is_refresh_token) {
      responseForbidden(res);
      return;
    }

    const account = await getAccountById(
      (req as Record<string, any>).account.id
    );
    if (token !== account.access_token) {
      responseForbidden(res);
      return;
    }

    next();
  } catch (error) {
    responseForbidden(res);
  }
};
