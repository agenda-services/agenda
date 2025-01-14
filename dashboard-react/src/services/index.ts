export const APPOINTMENTS_URL = import.meta.env.VITE_APPOINTMENTS_URL;
export const ACCOUNTS_URL = import.meta.env.VITE_ACCOUNTS_URL;

export const fetchClient = async (
  url: string | URL | Request,
  options?: RequestInit
) =>
  fetch(url, {
    ...options,
    credentials: "include"
  });
