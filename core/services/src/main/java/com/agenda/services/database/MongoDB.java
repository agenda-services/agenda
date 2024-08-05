package com.agenda.services.database;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.concurrent.TimeUnit;

public class MongoDB {
    private static MongoDB instance;
    private MongoDatabase database;
    private MongoClient mongoClient;
    private static final String DATABASE_NAME = "agenda";
    private static final String CONNECTION_STRING = "";

    private MongoDB() {
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(CONNECTION_STRING))
                .applyToConnectionPoolSettings(builder ->
                        builder.maxWaitTime(3, TimeUnit.SECONDS)
                )
                .build();

        mongoClient = MongoClients.create(settings);
        database = mongoClient.getDatabase(DATABASE_NAME);
    }

    public static MongoDB getInstance() {
        if (instance == null) {
            synchronized (MongoDB.class) {
                if (instance == null) {
                    instance = new MongoDB();
                }
            }
        }
        return instance;
    }

    public void close() { return; }
    public MongoCollection<Document> getCollection(String collection) {
        return database.getCollection(collection);
    }
}