import { CLIENTS_URL, fetchClient } from "..";

export const getClientsService = async () => {
  const response = await fetchClient(CLIENTS_URL);

  let data;
  try {
    data = await response.json();
  } catch (e) {
    const error = e as Error;
    throw new Error("Failed to parse JSON: " + error.message);
  }

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};
