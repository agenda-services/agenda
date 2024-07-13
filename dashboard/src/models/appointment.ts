declare type AppointmentType = "work" | "personal" | "not-defined";

export declare interface Appointment {
  id: string;
  client: Client;
  date: Date;
  type: AppointmentType;
  hasPayment: boolean;
  services: Service[];
}
