import { useState, useEffect, useCallback } from "react";
import {
  createAppointmentService,
  getAppointments,
  getAppointmentById as getAppointmentByIdService,
  updateAppointement as updateAppointementService
} from "../services/appointments/getAppointments";
import { Appointment, CreateAppointment } from "../models/Appointment";

export const useAppointments = (appointmentId?: string) => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getAppointmentsList = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const appointments = await getAppointments();
      setAppointments(appointments);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAppointmentById = async (appointmentId: string) => {
    setLoading(true);
    setError("");

    try {
      const appointment = await getAppointmentByIdService(appointmentId);
      setAppointment(appointment);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointmentsList();
  }, [getAppointmentsList]);

  useEffect(() => {
    if (!appointmentId) return;

    getAppointmentById(appointmentId);
  }, [appointmentId]);

  return {
    appointments,
    appointment,
    loading,
    error,
    setAppointments,
    getAppointmentsList,
    getAppointmentById
  };
};

export const useCreateAppointment = () => {
  const [data, setData] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createAppointment = async (appointment: CreateAppointment) => {
    setLoading(true);
    setError("");

    try {
      const response = await createAppointmentService(appointment);

      setData(response);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createAppointment };
};

export const useUpdateAppointment = () => {
  const [data, setData] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateAppointement = async (
    id: string,
    appointment: Partial<Appointment>
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await updateAppointementService(id, appointment);

      setData(response);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateAppointement };
};
