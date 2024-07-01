package com.agenda.core.clients.repositories;

import com.agenda.core.clients.models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
}
