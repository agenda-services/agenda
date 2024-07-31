package com.agenda.core.clients.functions;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Array;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class GetClientTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private GetClient getClientFn;


    @Test
    void shouldGetAClientByID() throws Exception {
        MockitoAnnotations.openMocks(this);
        Client client = new Client("CID123", "Pepe", "", "", "", "");
        Mockito.when(this.clientRepository.findById(Mockito.any())).thenReturn(Optional.of(client));


        APIGatewayProxyRequestEvent req = new APIGatewayProxyRequestEvent();
        Map<String, String> params = new HashMap();
        params.put("id", "CID123");
        req.setPathParameters(params);

        APIGatewayProxyResponseEvent response = this.getClientFn.apply(req);
        assertEquals(response.getStatusCode(), HttpStatus.OK.value());
    }
}