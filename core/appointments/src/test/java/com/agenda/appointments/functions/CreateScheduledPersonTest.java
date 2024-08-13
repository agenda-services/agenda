package com.agenda.appointments.functions;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.services.PersonService;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

class CreateScheduledPersonTest {
    @Test
    public void testHandleRequest() {
        PersonService personService = Mockito.mock(PersonService.class);

        CreateScheduledPerson lambdaFunction = new CreateScheduledPerson(personService);

        Person person = new Person();
        Mockito.when(personService.create(Mockito.any())).thenReturn(person);

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        request.setBody("first_name=Pepe&last_name=Perez");

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = lambdaFunction.handleRequest(request, context);
        assertEquals(HttpStatus.SC_CREATED, response.getStatusCode());
    }

    @Test
    public void testHandleRequestWithoutBodyFailed() {
        CreateScheduledPerson lambdaFunction = new CreateScheduledPerson();

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = lambdaFunction.handleRequest(request, context);
        assertEquals(HttpStatus.SC_BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testHandleRequestCreatePersonFailed() {
        PersonService personService = Mockito.mock(PersonService.class);
        Mockito.when(personService.create(Mockito.any())).thenThrow(PersonService.ERROR_PERSON_ALREADY_EXISTS);

        CreateScheduledPerson lambdaFunction = new CreateScheduledPerson(personService);

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        request.setBody("first_name=Pepe&last_name=Perez");

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = lambdaFunction.handleRequest(request, context);
        assertEquals(HttpStatus.SC_BAD_REQUEST, response.getStatusCode());
        assertThat(response.getBody()).contains(CreateScheduledPerson.ERROR_INTERNAL_SERVER.getMessage());
    }
}