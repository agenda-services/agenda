import { Account, AccountResponse, accountToResponse } from "../models/account";
import accountRepository, {
  errAccountNotFound
} from "../repositories/accountRepository";
import bcrypt from "bcrypt";
import { generateApiKey, refreshApiKey } from "./authorizerService";
import { REFRESH_KEY_EXPIRE_TIME } from "../shared/constants";

export const getAccountById = async (accountId: string) => {
  if (!accountId) throw Error("missing account_id");

  return await accountRepository.getAccount({ id: accountId });
};

export const getAccountByEmail = async (email: string) => {
  if (!email) throw Error("missing email");

  return await accountRepository.getAccount({ email });
};

export const getAccountByUsernameAndPass = async (
  username: string,
  password: string
): Promise<Account> => {
  const account = await getAccountByEmail(username);

  const isValidPassword = await bcrypt.compare(password, account.password);
  if (!isValidPassword) {
    throw errAccountNotFound;
  }

  return account;
};

export const saveAccount = async (data: Partial<Account>): Promise<Account> => {
  const account = await accountRepository.saveAccount(data as Account);

  const claims = accountToResponse(account);

  const apiKeyToRefresh = generateApiKey(
    { ...claims, is_refresh_token: true },
    REFRESH_KEY_EXPIRE_TIME
  );

  account.access_token = await refreshApiKey(claims, apiKeyToRefresh);
  account.refresh_access_token = apiKeyToRefresh;

  return account;
};

export const generateTokens = async (
  account: Account
): Promise<AccountResponse> => {
  const claims = accountToResponse(account) as unknown as Record<
    string,
    string
  >;

  delete claims.access_token;
  delete claims.refresh_access_token;

  const apiKeyToRefresh = generateApiKey(
    { ...claims, is_refresh_token: true },
    REFRESH_KEY_EXPIRE_TIME
  );

  const apiKey = await refreshApiKey(claims, apiKeyToRefresh);

  const response = accountToResponse(account);
  response.access_token = apiKey;
  response.refresh_access_token = account.refresh_access_token;

  return response;
};
