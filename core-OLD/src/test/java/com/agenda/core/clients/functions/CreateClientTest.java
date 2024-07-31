package com.agenda.core.clients.functions;


import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CreateClientTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private CreateClient createClientFn;

    @Test
    void shouldHandlerReturnsMessageWithName() {
        MockitoAnnotations.openMocks(this);

        Client clientMock = Mockito.mock(Client.class);
        Mockito.when(this.clientRepository.save(clientMock)).thenReturn(null);


        APIGatewayProxyRequestEvent req = new APIGatewayProxyRequestEvent();
        req.setBody("""
        {
            "first_name": "Pepe",
            "last_name": "Perez"
        }
        """);

        APIGatewayProxyResponseEvent response = this.createClientFn.apply(req);
        assertEquals(response.getStatusCode(), HttpStatus.CREATED.value());
    }
}