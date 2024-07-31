package com.agenda.appointments.repositories;

import com.agenda.appointments.models.Person;
import com.agenda.services.database.MongoDB;
import com.agenda.services.serializer.ISerializer;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Date;

public class PersonRepository {
    private final MongoCollection<Document> collection;
    private final ISerializer serializer;
    private final MongoDB DB;
    private final String COLLECTION_NAME = "people";

    public PersonRepository(ISerializer serializer) {
        this.DB = MongoDB.getInstance();
        this.collection = MongoDB.getInstance()
                .getCollection(COLLECTION_NAME);
        this.serializer = serializer;
    }

    public Person create(Person person) throws Exception {
        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(LocalDateTime.now());

        String jsonString = serializer.toJson(person);
        Document doc = Document.parse(jsonString);

        collection.insertOne(doc);

        return person;
    }

    public Person getPersonById(String personId) throws Exception {
        Document query = new Document("_id", personId);
        Document result = collection.find(query).first();

        if (result == null) {
            return null;
        }

        return serializer.fromJson(result.toJson(), Person.class);
    }
}
