package com.agenda.core.clients.functions;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;

@Component("list-clients")
public class ListClients implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    public ClientRepository clientRepository;
    private final Serializer serializer;

    @Autowired
    public ListClients(ClientRepository repository) {
        this.clientRepository = repository;
        this.serializer = new Serializer();
    }

    private int getPage(String page){
        try{
        return Integer.parseInt(page);
        } catch (NumberFormatException error){
            return 0;
        }
    }

    private APIGatewayProxyResponseEvent process(APIGatewayProxyRequestEvent req){
        try{

            List<Client> clients = clientRepository.findAll();

            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.OK.value()).withBody(serializer.toJson(clients));
        } catch (Exception error) {
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Internal server error: " + error);
        }
    }

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent input) {
        return this.process(input);
    }
}