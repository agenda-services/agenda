package com.agenda.appointments.functions;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CreateScheduledPersonTest {
    @Test
    public void testHandleRequest() {
        CreateScheduledPerson lambdaFunction = new CreateScheduledPerson();

        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        request.setBody("first_name=Pepe&last_name=Perez");

        Context context = new TestContext();

        APIGatewayProxyResponseEvent response = lambdaFunction.handleRequest(request, context);
        assertEquals(HttpStatus.SC_CREATED, response.getStatusCode());
    }
}