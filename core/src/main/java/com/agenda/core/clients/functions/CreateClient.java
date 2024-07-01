package com.agenda.core.clients.functions;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.models.ClientCreationDTO;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.function.Function;

@EnableMongoAuditing
@Component("create-client")
public class CreateClient implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    public ClientRepository clientRepository;
    private final Serializer serializer;

    @Autowired
    public CreateClient(ClientRepository repository) {
        this.clientRepository = repository;
        this.serializer = new Serializer();
    }


    private Client validateRequest(String clientData) throws Exception{
        if (clientData == null) {
            throw new Exception("Invalid request");
        }

        ClientCreationDTO createClientDTO = serializer.fromJson(clientData, ClientCreationDTO.class);
        if(createClientDTO == null){
            throw new Exception("Invalid request");
        }

        return createClientDTO.toClient();
    }

    private APIGatewayProxyResponseEvent process(APIGatewayProxyRequestEvent req){
        Client client;

        try {
            client = this.validateRequest(req.getBody());
        } catch (Exception error) {
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.BAD_REQUEST.value()).withBody("Invalid request: " + error);
        }

        try{
            client.setCreatedAt(LocalDateTime.now());
            Client clientResponse = clientRepository.save(client);
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.CREATED.value()).withBody(serializer.toJson(clientResponse));
        } catch (Exception error) {
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Internal server error: " + error);
        }
    }

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent input) {
        return this.process(input);
    }
}