import { generateAccountId } from "../shared/generator";
import { Account } from "../models/account";

export const errAccountNotFound = Error("account not found");

const getAccount = async ({ id = "", email = "" }): Promise<Account> => {
  let account;
  if (id) {
    account = await Account.findById(id);
  }

  if (!account && email) {
    account = await Account.findOne({ email });
  }

  if (!account) {
    throw errAccountNotFound;
  }

  return account as Account;
};

const saveAccount = async (data: Account): Promise<Account> => {
  const account = new Account(data);
  account._id = generateAccountId();

  account.created_at = new Date();
  account.updated_at = new Date();

  await account.save();

  return account as Account;
};

const updateToken = async (
  accountId: string,
  access_token: string,
  refresh_access_token: string
) => {
  await Account.findByIdAndUpdate(accountId, {
    access_token,
    refresh_access_token,
    updated_at: new Date()
  });
};

export default {
  getAccount,
  saveAccount,
  updateToken
};
