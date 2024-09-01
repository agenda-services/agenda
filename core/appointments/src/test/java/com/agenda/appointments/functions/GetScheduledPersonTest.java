package com.agenda.appointments.functions;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.services.IPersonService;
import com.agenda.appointments.services.PersonService;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class GetScheduledPersonTest {
    @Mock
    private IPersonService personServiceMock;

    @InjectMocks
    private GetScheduledPerson handler;

    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testHandleRequestNotFound() {
        when(personServiceMock.getPersonById(Mockito.any())).thenThrow(PersonService.ERROR_PERSON_NOT_FOUND);

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();

        Map<String, String> pathParameters = new HashMap();
        pathParameters.put("id", "1");
        request.setPathParameters(pathParameters);

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = handler.handleRequest(request, context);

        assertEquals(HttpStatus.SC_NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testHandleRequestFound() {
        Person mockPerson = new Person();
        mockPerson.setFirstName("Pepe");

        when(personServiceMock.getPersonById(Mockito.any())).thenReturn(mockPerson);

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        Map<String, String> pathParameters = new HashMap();
        pathParameters.put("id", "PID811887c20bb2492ba3412d03f30d8d3c");
        request.setPathParameters(pathParameters);

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = handler.handleRequest(request, context);

        assertEquals(HttpStatus.SC_OK, response.getStatusCode());
        assertThat(response.getBody()).contains("first_name\":\"Pepe");
    }
}