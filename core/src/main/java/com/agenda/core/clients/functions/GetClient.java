package com.agenda.core.clients.functions;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component("get-client")
public class GetClient implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    public ClientRepository clientRepository;
    private final Serializer serializer;

    @Autowired
    public GetClient(ClientRepository repository) {
        this.clientRepository = repository;
        this.serializer = new Serializer();
    }

    private APIGatewayProxyResponseEvent process(APIGatewayProxyRequestEvent req){
        try{
            String id = req.getPathParameters().get("id");
            if (id == null) {
                throw new Exception("Missing id");
            }

            Client client = clientRepository.findById(id).orElse(null);
            if (client == null) {
                return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.NOT_FOUND.value()).withBody(null);
            }

            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.OK.value()).withBody(serializer.toJson(client));
        } catch (Exception error) {
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Internal server error: " + error);
        }
    }

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent input) {
        return this.process(input);
    }
}