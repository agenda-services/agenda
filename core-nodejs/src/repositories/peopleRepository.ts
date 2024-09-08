import people from "../data/people";
import { Person } from "../models/person";

const getPeople = (): Person[] => {
  return people;
};

const getPersonById = (personId: string): Person | undefined => {
  return people.find((person) => person.person_id === personId);
};

const savePerson = (person: Person) => {
  people.push(person);
};

export default {
  getPeople,
  getPersonById,
  savePerson
};
