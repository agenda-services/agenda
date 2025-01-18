import { ACCOUNTS_URL, fetchClient } from "..";

export const getAccount = async () => {
  const response = await fetchClient(ACCOUNTS_URL);
  const responseJson = await response.json();

  if (!response.ok) {
    throw Error(JSON.stringify(responseJson));
  }

  return responseJson;
};
