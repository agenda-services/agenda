import { Request, Response } from "express";
import { responseBadRequest, responseInternalError } from "../response";
import {
  generateTokens,
  getAccountByUsernameAndPass
} from "../../services/accountsService";
import { StatusCodes } from "http-status-codes";
import { errAccountNotFound } from "../../repositories/accountRepository";
import { AGENDA_API_KEY, AGENDA_REFRESH_API_KEY } from "../../shared/constants";

export default async function (req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    responseBadRequest(res, "invalid username or password");
    return;
  }

  try {
    const account = await getAccountByUsernameAndPass(username, password);
    const response = await generateTokens(account);

    res.cookie(AGENDA_API_KEY, response.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    res.cookie(AGENDA_REFRESH_API_KEY, response.refresh_access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    if (error === errAccountNotFound) {
      responseBadRequest(res, "invalid username or password");
      return;
    }

    responseInternalError(res);
  }
}
