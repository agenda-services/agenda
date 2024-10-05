import { personSchema } from "../schemas/people";
import mongoose from "mongoose";

export interface Person {
  _id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}

export interface PersonResponse {
  id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}

export const Person = mongoose.model("Person", personSchema, "people");

export const personToResponse = (person: Person): PersonResponse => {
  const { _id, firstname, lastname, phone_number, created_at, updated_at } =
    person;

  return {
    id: _id,
    firstname,
    lastname,
    phone_number,
    created_at,
    updated_at
  };
};
