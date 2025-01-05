import { StatusCodes } from "http-status-codes";
import {
  AGENDA_API_KEY,
  AGENDA_REFRESH_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI
} from "../../shared/constants";
import { Request, Response } from "express";
import { responseInternalError } from "../response";
import { getGoogleProfile } from "../../services/authorizerService";
import {
  generateTokens,
  getAccountByEmail
} from "../../services/accountsService";
import { errAccountNotFound } from "../../repositories/accountRepository";
import createAccount from "./createAccount";

export const redirect = async (_: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.json({ url });
};

export const callback = async (req: Request, res: Response) => {
  const { code } = req.query;
  let email, name;

  try {
    const profile = await getGoogleProfile(code as string);
    email = profile.email;
    name = profile.name;
  } catch (error) {
    responseInternalError(res);
    return;
  }

  try {
    const account = await getAccountByEmail(email);
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
    if (error == errAccountNotFound) {
      req.body.email = email;
      req.body.name = name;
      req.body.password = "pass";

      createAccount(req, res);
      return;
    }

    responseInternalError(res);
  }
};
