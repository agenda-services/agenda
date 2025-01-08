import jwt from "jsonwebtoken";
import accountRepository from "../repositories/accountRepository";
import { AccountResponse, JWTClaims } from "../models/account";
import {
  API_KEY_EXPIRE_TIME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_PRIVATE_KEY
} from "../shared/constants";
import axios from "axios";

const googleTokenURL = "https://oauth2.googleapis.com/token";
const googleUserInfoURL = "https://www.googleapis.com/oauth2/v1/userinfo";

export const getClaims = (token: string): Partial<JWTClaims> => {
  if (!JWT_PRIVATE_KEY || !token) {
    throw Error("missing jtw private key");
  }

  const decoded = jwt.verify(token, JWT_PRIVATE_KEY) as Record<string, string>;
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    is_refresh_token: decoded.is_refresh_token
  };
};

export const generateApiKey = (claims: any, expiresIn: string): string => {
  if (!JWT_PRIVATE_KEY) {
    throw Error("missing jtw private key");
  }

  return jwt.sign(claims, JWT_PRIVATE_KEY, { expiresIn });
};

export const refreshApiKey = async (
  claims: any,
  refreshAccessToken: string
) => {
  if (!JWT_PRIVATE_KEY) {
    throw Error("missing jtw private key");
  }

  const accountDecoded = claims as Partial<AccountResponse>;
  if (!accountDecoded.id) {
    throw Error("missing account id");
  }

  const token = generateApiKey(claims, API_KEY_EXPIRE_TIME);

  await accountRepository.updateToken(
    accountDecoded.id,
    token,
    refreshAccessToken
  );

  return token;
};

export const getGoogleProfile = async (
  code: string
): Promise<{
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}> => {
  const { data } = await axios.post(googleTokenURL, {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    code,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code"
  });

  const { access_token } = data;

  const { data: profile } = await axios.get(googleUserInfoURL, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  return profile;
};
