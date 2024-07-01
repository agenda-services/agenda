package com.agenda.core.clients.functions;


import com.agenda.core.clients.CreateClient;
import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.models.ClientCreationDTO;
import com.agenda.core.clients.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

        String request = """
        {
            "first_name": "Pepe",
            "last_name": "Perez"
        }
        """;

        ResponseEntity response = this.createClientFn.handler().apply(request);
        System.out.println(response.toString());
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
    }
}