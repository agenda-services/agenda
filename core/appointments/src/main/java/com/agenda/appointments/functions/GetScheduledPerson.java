package com.agenda.appointments.functions;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.services.IPersonService;
import com.agenda.appointments.services.PersonService;
import com.agenda.services.serializer.ISerializer;
import com.agenda.services.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;

import java.util.Map;

public class GetScheduledPerson implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private IPersonService personService;
    private static ISerializer serializer = new Serializer();

    public GetScheduledPerson() {
        this.personService = new PersonService(serializer);
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        if(personService == null){
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                    .withBody(String.format("{\"message\": \"%s\"}", "service not init"));
        }

        Map<String, String> pathParameters = input.getPathParameters();

        if(pathParameters == null ){
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.SC_BAD_REQUEST).withBody("{ \"message\": \"missing params\"}");
        }

        try {
            Person person = personService.getPersonById(pathParameters.get("id"));
            String personResponse = serializer.toJson(person);
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.SC_OK).withBody(personResponse);
        } catch (Error e) {
            APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
            response.withBody(String.format("{\"message\": \"%s\"}", e));

            if (e.equals(PersonService.errorPersonNotFound)) {
                return response.withStatusCode(HttpStatus.SC_NOT_FOUND);
            }

            return response.withStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
            response.withBody(String.format("{\"message\": \"%s\"}", e));

            return response.withStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
