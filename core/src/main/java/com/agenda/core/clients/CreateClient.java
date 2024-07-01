package com.agenda.core.clients;

import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.models.ClientCreationDTO;
import com.agenda.core.clients.repository.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Function;

@SpringBootApplication
@EnableMongoAuditing
public class CreateClient {

    @Autowired
    public ClientRepository clientRepository;
    private Serializer serializer;


    private Client validateRequest(String clientData) throws Exception{
        try {
            ClientCreationDTO createClientDTO = serializer.fromJson(clientData, ClientCreationDTO.class);
            return createClientDTO.toClient();
        } catch (Exception error){
            throw error;
        }
    }

    private ResponseEntity<String> process(String req){
        Client client;

        try {
            client = this.validateRequest(req);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Invalid request: " + error.toString());
        }

        try{
            client.setCreatedAt(LocalDateTime.now());
            Client clientResponse = clientRepository.save(client);
            return new ResponseEntity(serializer.toJson(clientResponse), HttpStatus.CREATED);
        } catch (Exception error) {
            return  ResponseEntity.internalServerError().body("Internal server error: " + error.toString());
        }
    }

    private void init(){
        serializer = new Serializer();
    }

    @Bean
    public Function<String, ResponseEntity<String>> handler() {
        this.init();

        return (req) ->  this.process(req);
    }

    public static void main(String args[]){
        SpringApplication.run(CreateClient.class, args);
    }
}
