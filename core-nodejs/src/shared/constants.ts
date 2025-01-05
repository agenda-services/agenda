export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
export const AGENDA_API_KEY = "agenda-api-key";
export const AGENDA_REFRESH_API_KEY = "agenda-refresh-api-key";
export const BCRYPT_SALT_ROUNDS = 10;
export const API_KEY_EXPIRE_TIME = "2d";
export const REFRESH_KEY_EXPIRE_TIME = "15d";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const GOOGLE_REDIRECT_URI =
  "http://localhost:3000/api/v1/accounts/auth/google/callback";
export const COOKIE_SECRET = process.env.COOKIE_SECRET || "";
export const HOME_DASHBOARD =
  process.env.HOME_DASHBOARD || "http://localhost:5173/";
