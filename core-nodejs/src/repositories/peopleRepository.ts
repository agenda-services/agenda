import { generatePersonId } from "../shared/generator";
import { Person } from "../models/person";

const getPeople = async (): Promise<Person[]> => {
  return await Person.find({});
};

const getPersonById = async (personId: string): Promise<Person | null> => {
  return await Person.findById(personId);
};

const savePerson = async (data: Person): Promise<Person> => {
  const personToSave = new Person(data);

  personToSave._id = generatePersonId();

  personToSave.created_at = new Date();
  personToSave.updated_at = new Date();

  await personToSave.save();

  return personToSave as Person;
};

export default {
  getPeople,
  getPersonById,
  savePerson
};
