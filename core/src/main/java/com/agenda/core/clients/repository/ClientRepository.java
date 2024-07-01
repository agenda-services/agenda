package com.agenda.core.clients.repository;

import com.agenda.core.clients.models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
}
