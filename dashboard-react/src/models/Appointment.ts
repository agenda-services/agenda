import { Person } from "./Person";

export enum AppointmentStatus {
  Active = "active",
  Canceled = "canceled",
  Done = "done"
}

export interface Appointment {
  id: string;
  date: Date;
  service_id: string;
  status: AppointmentStatus;
  person: Person;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAppointment {
  firstname: string;
  lastname: string;
  date: Date;
  person_id?: string;
}
