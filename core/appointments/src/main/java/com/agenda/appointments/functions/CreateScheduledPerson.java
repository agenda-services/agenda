package com.agenda.appointments.functions;

import com.agenda.appointments.models.Person;
import com.agenda.appointments.services.IPersonService;
import com.agenda.appointments.services.PersonService;
import com.agenda.services.serializer.Serializer;
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
    private IPersonService personService = null;
    static final Error errorMissingBody = new Error("missing body");
    static final Error errorInternalServerError = new Error("something wrong saving person");

    public CreateScheduledPerson() {
        this.personService = new PersonService(new Serializer());
    }

    private Map<String, String> validateRequest(APIGatewayProxyRequestEvent input) throws Exception {
        String body = input.getBody();
        if(body == null || body.equals("")){
            throw errorMissingBody;
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
        if(personService == null){
            System.out.println("no person service");
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                    .withBody(String.format("\"message\" : \"%s\"", errorInternalServerError));
        }

        Map<String, String> params;

        try {
            params = validateRequest(input);
        } catch (Exception e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_BAD_REQUEST)
                    .withBody(String.format("\"message\" : \"%s\"", errorMissingBody));
        }

        Person person = new Person();

        person.setFirstName(params.get("first_name"));
        person.setLastName(params.get("last_name"));
        person.setEmail(params.get("email"));
        person.setAddress(params.get("address"));
        person.setPhoneNumber(params.get("phone_number"));

        Person personSaved;

        try {
            personSaved = personService.create(person);
        } catch (Exception e) {
            System.out.println(e);
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                    .withBody(String.format("\"message\" : \"%s\"", errorInternalServerError));
        }

        return new APIGatewayProxyResponseEvent()
                .withStatusCode(HttpStatus.SC_CREATED)
                .withBody(personSaved.toString());
    }
}
