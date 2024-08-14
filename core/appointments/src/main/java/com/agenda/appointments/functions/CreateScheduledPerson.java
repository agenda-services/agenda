package com.agenda.appointments.functions;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.services.IPersonService;
import com.agenda.appointments.services.PersonService;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CreateScheduledPerson implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private IPersonService personService;
    static final Error ERROR_MISSING_BODY = new Error("missing body");
    static final Error ERROR_INTERNAL_SERVER = new Error("something wrong saving person");

    public CreateScheduledPerson() {
        this.personService = new PersonService();
    }

    public CreateScheduledPerson(PersonService personService) {
        this.personService = personService;
    }

    private Map<String, String> validateRequest(APIGatewayProxyRequestEvent input) throws Error {
        String body = input.getBody();
        if(body == null || body.isEmpty()){
            throw ERROR_MISSING_BODY;
        }

        List<NameValuePair> pairs = URLEncodedUtils.parse(body, StandardCharsets.UTF_8);
        Map<String, String> params = new HashMap<String, String>();
        for (NameValuePair pair : pairs){
            params.put(pair.getName(), pair.getValue());
        }

        return params;
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Map<String, String> params;

        try {
            params = validateRequest(input);
        } catch (Error e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_BAD_REQUEST)
                    .withBody(String.format("\"message\" : \"%s\"", ERROR_MISSING_BODY.getMessage()));
        }

        Person person = new Person();

        person.setFirstName(params.get("first_name"));
        person.setLastName(params.get("last_name"));
        person.setPhoneNumber(params.get("phone_number"));

        Person personSaved;

        try {
            personSaved = personService.create(person);
        } catch (Error e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_BAD_REQUEST)
                    .withBody(String.format("\"message\" : \"%s\"", ERROR_INTERNAL_SERVER.getMessage()));
        }

        return new APIGatewayProxyResponseEvent()
                .withStatusCode(HttpStatus.SC_CREATED)
                .withBody(personSaved.toString());
    }
}
