package com.agenda.appointments.repositories;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.function.Consumer;

import com.agenda.appointments.models.Person;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.GetItemEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

class PersonRepositoryTest {
    PersonRepository personRepository;

    @BeforeEach
    void setUp(){
        personRepository = new PersonRepository();
    }

    @Test
    void testCreatePersonFailed() {
        personRepository.initMock(Mockito.mock(DynamoDbClient.class), Mockito.mock(DynamoDbTable.class));

        try {
            Person person = new Person();
            personRepository.create(person);
        } catch (Error e){
            assertEquals(e, PersonRepository.ERROR_MISSING_PERSON_ID);
        }
    }

    @Test
    void testCreatePersonSuccess() {
        personRepository.initMock(Mockito.mock(DynamoDbClient.class), Mockito.mock(DynamoDbTable.class));

        LocalDateTime now = LocalDateTime.of(2024, 8, 11, 10, 0);
        Mockito.mockStatic(LocalDateTime.class);
        Mockito.when(LocalDateTime.now()).thenReturn(now);


        Person person = new Person("PID123", "", "", "", null, null);
        Person personSaved = personRepository.create(person);

        assertEquals(personSaved.getCreatedAt(), now);
    }

    @Test
    void testGetPersonByIdMissingIdError() {
        DynamoDbTable mockTable = Mockito.mock(DynamoDbTable.class);
        Mockito.when(mockTable.getItem((String) Mockito.any())).thenReturn(new Person());
        personRepository.initMock(Mockito.mock(DynamoDbClient.class), mockTable);

        try{
            personRepository.getPersonById("PID123");
        } catch (Error e){
            assertEquals(e, PersonRepository.ERROR_MISSING_PERSON_ID);
        }
    }

    @Test
    void testGetPersonByIdSuccess() {
        DynamoDbTable mockTable = Mockito.mock(DynamoDbTable.class);
        Mockito.when(mockTable.getItem((Consumer<GetItemEnhancedRequest.Builder>) Mockito.any())).thenReturn(new Person("PID123", "", "", "", null, null));
        personRepository.initMock(Mockito.mock(DynamoDbClient.class), mockTable);

        Person person = personRepository.getPersonById("PID123");
        assertEquals("PID123", person.getPersonId());
    }
}