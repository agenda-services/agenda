import { Person } from "../models/person";
import peopleRepository from "../repositories/peopleRepository";

const getScheduledPeople = async (): Promise<Person[]> => {
  return await peopleRepository.getPeople();
};

const getScheduledPersonById = async (personId: string) => {
  return await peopleRepository.getPersonById(personId);
};

const createPerson = async (person: Partial<Person>): Promise<Person> => {
  const personToCreate = person as Person;

  const personCreated = await peopleRepository.savePerson(personToCreate);

  return personCreated;
};

export default {
  getScheduledPeople,
  getScheduledPersonById,
  createPerson
};
