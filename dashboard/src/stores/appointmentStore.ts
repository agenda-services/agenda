import { atom } from "nanostores";
import type { Appointment } from "../models/appointment";

export const appointments = atom<Appointment[]>([
  {
    id: "dsajkhdjkash",
    client: {
      id: "",
      firstName: "Pepito",
      lastName: "Perez",
      cellphone: ""
    },
    date: new Date(),
    hasPayment: false,
    services: [],
    type: "work"
  }
]);
