package com.agenda.core.clients.functions;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class ListClientsTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ListClients listClientsFn;

    @Test
    void shouldListAllClients() throws Exception {
        MockitoAnnotations.openMocks(this);

        List<Client> clients = new ArrayList();

        clients.add(new Client("CID123", "Pepe", "", "", "", ""));
        clients.add(new Client("CID456", "Andres", "", "", "", ""));
        clients.add(new Client("CID789", "Camilo", "", "", "", ""));
        clients.add(new Client("CID012", "Alex", "", "", "", ""));

        Mockito.when(this.clientRepository.findAll()).thenReturn(clients);


        APIGatewayProxyRequestEvent req = new APIGatewayProxyRequestEvent();

        APIGatewayProxyResponseEvent response = this.listClientsFn.apply(req);
        assertEquals(response.getStatusCode(), HttpStatus.OK.value());

        Serializer serializer = new Serializer();
        List<Client> clientsResponse = serializer.fromJson(response.getBody(), List.class);
        assertEquals(clientsResponse.size(), 4);
    }
}