import { Person } from "../models/person";
import peopleRepository from "../repositories/peopleRepository";

const getScheduledPeople = () => {
  return peopleRepository.getPeople();
};

const getScheduledPersonById = (personId: string) => {
  return peopleRepository.getPersonById(personId);
};

const createPerson = (person: Partial<Person>): Person => {
  const personId = "";

  const personCreated = person as Person;

  personCreated.person_id = personId;
  personCreated.created_at = new Date().toLocaleDateString();
  personCreated.updated_at = new Date().toLocaleDateString();

  peopleRepository.savePerson(personCreated);

  return personCreated;
};

export default {
  getScheduledPeople,
  getScheduledPersonById,
  createPerson
};
