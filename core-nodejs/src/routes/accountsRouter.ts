import { checkAuthorization } from "../middlewares/auth";
import createAccount from "../controllers/accounts/createAccount";
import getAccount from "../controllers/accounts/getAccount";
import login from "../controllers/accounts/login";
import logout from "../controllers/accounts/logout";
import refresh from "../controllers/accounts/refresh";
import { Router } from "express";
import { callback, redirect } from "../controllers/accounts/authGoogle";

export const accountsRouter = Router();

accountsRouter.post("/login", login);
accountsRouter.post("/logout", checkAuthorization, logout);
accountsRouter.post("/refresh", refresh);
accountsRouter.get("/auth/google", redirect);
accountsRouter.get("/auth/google/callback", callback);
accountsRouter.post("/", createAccount);
accountsRouter.get("/", checkAuthorization, getAccount);
