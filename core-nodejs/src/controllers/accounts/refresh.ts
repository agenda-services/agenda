import { AGENDA_REFRESH_API_KEY } from "../../shared/constants";
import { responseForbidden, responseUnauthorized } from "../response";
import { getClaims, refreshApiKey } from "../../services/authorizerService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAccountById } from "../../services/accountsService";

export default async function (req: Request, res: Response) {
  let token = req.headers[AGENDA_REFRESH_API_KEY] as string;
  if (!token) {
    token = req.cookies[AGENDA_REFRESH_API_KEY];
  }

  if (!token) {
    responseUnauthorized(res);
    return;
  }

  try {
    const claims = getClaims(token);
    delete claims.is_refresh_token;

    const apiKey = await refreshApiKey(claims, token);

    const account = await getAccountById(
      (req as Record<string, any>).account.id
    );

    if (token !== account.refresh_access_token) {
      responseForbidden(res);
      return;
    }

    return res.status(StatusCodes.OK).json({ api_key: apiKey });
  } catch (error) {
    responseForbidden(res);
  }
}
