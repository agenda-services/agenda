import { useState, useEffect } from "react";
import {
  createAppointmentService,
  getAppointments
} from "../../services/appointments/getAppointments";
import { Appointment, CreateAppointment } from "../../models/Appointment";

export const useAppointments = () => {
  const [data, setData] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAppointmentsList = async () => {
    try {
      const appointments = await getAppointments();

      setData(appointments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointmentsList();
  }, []);

  return { data, loading, error, getAppointmentsList };
};

export const useCreateAppointment = () => {
  const [data, setData] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAppointment = async (appointment: CreateAppointment) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createAppointmentService(appointment);

      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createAppointment };
};
