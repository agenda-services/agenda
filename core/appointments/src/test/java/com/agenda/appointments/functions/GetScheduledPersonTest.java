package com.agenda.appointments.functions;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

public class GetScheduledPersonTest {
    @Test
    public void testHandleRequestNotFound() {
        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        Map<String, String> pathParameters = new HashMap<String, String>();
        pathParameters.put("id", "1");
        request.setPathParameters(pathParameters);

        Context context = new TestContext();
        GetScheduledPerson handler = new GetScheduledPerson();

        APIGatewayProxyResponseEvent response = handler.handleRequest(request, context);

        assertEquals(HttpStatus.SC_NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testHandleRequestFound() {
        APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
        Map<String, String> pathParameters = new HashMap<String, String>();
        pathParameters.put("id", "PIDf44c6792824b461ebff49f4c24fa4b36");
        request.setPathParameters(pathParameters);

        Context context = new TestContext();
        GetScheduledPerson handler = new GetScheduledPerson();

        APIGatewayProxyResponseEvent response = handler.handleRequest(request, context);

        assertEquals(HttpStatus.SC_OK, response.getStatusCode());
        assertThat(response.getBody()).contains("first_name\":\"Pepe");
    }
}