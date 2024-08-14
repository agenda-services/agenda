package com.agenda.appointments.services;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.repositories.PersonRepository;
import com.agenda.services.generators.Prefixes;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

class PersonServiceTest {
    @Test
    void testCreatePersonServiceThatAlreadyExists() {
        PersonService personService = new PersonService();

        Person person = new Person();
        person.setPersonId("PID123");

        try{
            personService.create(person);
        } catch (Error e){
            assertEquals(e, PersonService.ERROR_PERSON_ALREADY_EXISTS);
        }
    }

    @Test
    void testCreatePersonServiceSuccess() {
        PersonService personService = new PersonService();
        PersonRepository personRepository = Mockito.mock(PersonRepository.class);
        personService.initMock(personRepository);

        Person person = new Person();
        Mockito.when(personRepository.create(Mockito.any())).thenReturn(person);

        Person personSaved = personService.create(person);

        assertThat(personSaved.getPersonId()).contains(Prefixes.PERSON.getType());
    }

    @Test
    void testGetPersonByIdFailure() {
        PersonRepository personRepository = Mockito.mock(PersonRepository.class);
        PersonService personService = new PersonService();
        personService.initMock(personRepository);

        Mockito.when(personRepository.getPersonById(Mockito.any())).thenReturn(null);

        try {
            personService.getPersonById("PID123");
        } catch (Error e){
            assertEquals(e, PersonService.ERROR_PERSON_NOT_FOUND);
        }
    }
}