package com.agenda.appointments.services;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.repositories.PersonRepository;
import com.agenda.services.generators.GeneratorIDFactory;

public class PersonService implements IPersonService {
    private final PersonRepository personRepository;

    public static final Error errPersonNotFound = new Error("person not found");
    public static final Error errorAlreadyExists = new Error("person already exists");

    public PersonService() {
        this.personRepository = new PersonRepository();
    }

    @Override
    public Person create(Person person) throws Error {
        String personId = person.getPersonId();

        if(personId != null && !personId.isEmpty()){
            throw errorAlreadyExists;
        }

        person.setPersonId(GeneratorIDFactory.generatePersonId());

        Person personSaved = personRepository.create(person);

        return personSaved;
    }

    @Override
    public Person getPersonById(String personId) throws Error {
       Person person = personRepository.getPersonById(personId);
       if(person == null){
           throw errPersonNotFound;
       }

       return person;
    }
}
