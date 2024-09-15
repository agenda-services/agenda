import { PrefixId } from "@/models/prefixId";
import { v4 as uuidv4 } from "uuid";

const getId = (prefix: PrefixId) => {
  const idWithoutLine = uuidv4().replaceAll("-", "");
  return `${prefix}${idWithoutLine}`;
};

export const generatePersonId = () => getId(PrefixId.PersonId);
export const generateAppointmentId = () => getId(PrefixId.AppointmentId);
