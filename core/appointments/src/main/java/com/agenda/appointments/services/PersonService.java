package com.agenda.appointments.services;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.repositories.PersonRepository;
import com.agenda.services.generators.GeneratorIDFactory;
import com.agenda.services.serializer.ISerializer;

public class PersonService implements IPersonService {
    private final PersonRepository personRepository;
    static final Error errorAlreadyExists = new Error("person already exists");
    public static final Error errorPersonNotFound = new Error("person not found");

    public PersonService(ISerializer serializer) {
        this.personRepository = new PersonRepository(serializer);
    }

    @Override
    public Person create(Person person) throws Error, Exception {
        String personId = person.getId();

        if(personId != null && !personId.isEmpty()){
            throw errorAlreadyExists;
        }

        person.setId(GeneratorIDFactory.generatePersonId());

        Person personSaved = personRepository.create(person);

        return personSaved;
    }

    @Override
    public Person getPersonById(String personId) throws Exception{
        return personRepository.getPersonById(personId);
    }
}
