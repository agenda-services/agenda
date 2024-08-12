package com.agenda.appointments.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PersonTest {

    @Test
    void testPersonAttr(){
        Person person = new Person();

        person.setPersonId("PID123");
        person.setFirstName("pepe");
        person.setLastName("perez");
        person.setPhoneNumber("311111111");

        assertEquals(person.getPersonId(), "PID123");
        assertEquals(person.getFirstName(), "pepe");
        assertEquals(person.getLastName(), "perez");
        assertEquals(person.getPhoneNumber(), "311111111");
    }
}