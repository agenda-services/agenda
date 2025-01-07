import { Person } from "../models/person";
import peopleRepository from "../repositories/peopleRepository";

const getScheduledPeople = async (accountId: string): Promise<Person[]> => {
  return await peopleRepository.getPeople(accountId);
};

const getScheduledPersonById = async (personId: string) => {
  return await peopleRepository.getPersonById(personId);
};

const createPerson = async (person: Partial<Person>): Promise<Person> => {
  if (!person.account_id) {
    throw Error("missing account id");
  }

  const personToCreate = person as Person;

  const personCreated = await peopleRepository.savePerson(personToCreate);

  return personCreated;
};

export default {
  getScheduledPeople,
  getScheduledPersonById,
  createPerson
};
