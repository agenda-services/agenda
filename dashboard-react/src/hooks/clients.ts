"use client";
import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import { getClientsService } from "../services/clients/getClients";

export const useClients = () => {
  const [clients, setClients] = useState<Person[]>([]);
  const [originalClients, setOriginalClients] = useState<Person[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await getClientsService();
        setOriginalClients(res);
        setClients(res);
      } catch (error) {
        setError(error as string);
        console.error(error);
      }
    };
    getClients();
  }, []);

  return { clients, setClients, originalClients, error };
};
