package com.agenda.appointments.services;

import com.agenda.appointments.models.Person;

public interface IPersonService {
    Person create(Person person) throws Exception;
    Person getPersonById(String personId) throws Error, Exception;
}
