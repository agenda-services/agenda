import { map } from "nanostores";
import type { Appointment } from "../models/appointment";

export const client = map<Client>({
  id: "",
  firstName: "",
  lastName: "",
  cellphone: ""
});
