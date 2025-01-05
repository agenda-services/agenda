import { Request, Response } from "express";
import { responseBadRequest, responseInternalError } from "../response";
import { generateTokens, getAccountById } from "../../services/accountsService";
import { AGENDA_API_KEY, AGENDA_REFRESH_API_KEY } from "../../shared/constants";
import { StatusCodes } from "http-status-codes";

export default async function (req: Request, res: Response) {
  try {
    const { id } = (req as Record<string, any>).account;
    if (!id) {
      responseBadRequest(res, "missing account id");
      return;
    }

    const account = await getAccountById(id);
    await generateTokens(account);

    res.clearCookie(AGENDA_API_KEY);
    res.clearCookie(AGENDA_REFRESH_API_KEY);
    res.status(StatusCodes.OK).json({ message: "success" });
  } catch (error) {
    responseInternalError(res);
  }
}
