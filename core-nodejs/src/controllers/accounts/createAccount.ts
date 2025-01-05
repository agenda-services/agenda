import { Request, Response } from "express";
import { responseBadRequest, responseInternalError } from "../response";
import { Account, accountToResponse } from "../../models/account";
import { saveAccount, getAccountByEmail } from "../../services/accountsService";
import { StatusCodes } from "http-status-codes";
import { errAccountNotFound } from "../../repositories/accountRepository";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../../shared/constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidPassword = (pass: string): boolean => {
  return !pass.includes(" ");
};

export default async function (req: Request, res: Response) {
  const data = req.body as Partial<Account>;

  if (!data.email || !emailRegex.test(data.email)) {
    responseBadRequest(res, "invalid email");
    return;
  }

  if (!data.name) {
    responseBadRequest(res, "missing name");
    return;
  }

  if (!data.password) {
    responseBadRequest(res, "missing password");
    return;
  }

  if (!data.password) {
    responseBadRequest(res, "missing password");
    return;
  }

  if (!isValidPassword(data.password)) {
    responseBadRequest(res, "invalid password");
    return;
  }

  try {
    const accountAlreadyExists = await getAccountByEmail(data.email);
    if (accountAlreadyExists) {
      responseBadRequest(res, "account invalid to create");
      return;
    }
  } catch (error) {
    if (error !== errAccountNotFound) {
      responseInternalError(res);
      return;
    }
  }

  try {
    data.password = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);
    const account = await saveAccount(data);
    const accountWithKeys = account;
    const response = accountToResponse(account);

    response.access_token = accountWithKeys.access_token;
    response.refresh_access_token = accountWithKeys.refresh_access_token;
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    responseInternalError(res);
  }
}
