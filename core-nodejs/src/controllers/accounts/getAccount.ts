import { getClaims } from "../../services/authorizerService";
import { Request, Response } from "express";
import {
  responseBadRequest,
  responseInternalError,
  responseNotFound
} from "../response";
import { getAccountById } from "../../services/accountsService";
import { accountToResponse } from "../../models/account";
import { errAccountNotFound } from "../../repositories/accountRepository";
import { StatusCodes } from "http-status-codes";

export default async function (req: Request, res: Response) {
  try {
    const { id } = (req as Record<string, any>).account;
    if (!id) {
      responseBadRequest(res, "missing account id");
      return;
    }

    const account = await getAccountById(id);
    return res.status(StatusCodes.OK).json(accountToResponse(account));
  } catch (error) {
    if (error === errAccountNotFound) {
      responseNotFound(res, "account not found");
      return;
    }

    responseInternalError(res);
  }
}
