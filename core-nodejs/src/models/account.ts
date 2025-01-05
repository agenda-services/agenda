import { accountSchema } from "../schemas/accounts";
import mongoose from "mongoose";

export interface JWTClaims {
  id: string;
  email: string;
  name: string;
  is_refresh_token: string;
}

export interface Account {
  _id: string;
  email: string;
  password: string;
  name: string;
  access_token: string;
  refresh_access_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface AccountResponse {
  id: string;
  email: string;
  name: string;
  access_token?: string;
  refresh_access_token?: string;
}

export const Account = mongoose.model("Account", accountSchema, "accounts");

export const accountToResponse = (account: Account): AccountResponse => {
  const { _id, email, name } = account;

  return {
    id: _id,
    email,
    name
  };
};
