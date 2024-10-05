import { appointmentSchema } from "../schemas/appointments";
import mongoose from "mongoose";
import { Person, PersonResponse, personToResponse } from "./person";

export enum AppointmentStatus {
  Active = "active",
  Canceled = "canceled",
  Done = "done"
}

export interface Appointment {
  _id: string;
  person_id: string;
  date: Date;
  service_id: string;
  status: AppointmentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface AppointmentResponse
  extends Omit<Appointment, "person_id" | "_id"> {
  id: string;
  person: PersonResponse | null;
}

export const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

export const appointmentToResponse = (
  appointment: Appointment,
  person: Person | null
): AppointmentResponse => {
  const { _id, date, service_id, status, created_at, updated_at } = appointment;

  return {
    id: _id,
    date,
    service_id,
    status,
    created_at,
    updated_at,
    person: !person ? null : personToResponse(person)
  };
};
