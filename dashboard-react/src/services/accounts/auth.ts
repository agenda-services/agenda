import { ACCOUNTS_URL, fetchClient } from "..";

export const redirectGoogleAuth = async () => {
  const response = await fetchClient(ACCOUNTS_URL + "auth/google");
  const responseJson = await response.json();

  window.location.href = responseJson.url;
};

export const authPassword = async (username: string, pass: string) => {
  const body = new URLSearchParams();

  body.set("username", username);
  body.set("password", pass);

  const req: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body
  };

  const response = await fetchClient(ACCOUNTS_URL + "login", req);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};
