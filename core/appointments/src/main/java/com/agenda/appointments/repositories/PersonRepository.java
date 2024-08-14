package com.agenda.appointments.repositories;

import com.agenda.appointments.models.Person;
import com.agenda.services.aws.DynamoDB;
import java.time.LocalDateTime;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;


public class PersonRepository {
    private DynamoDbTable<Person> table;
    protected final String TABLE_NAME = "people";

    public static final Error ERROR_MISSING_PERSON_ID = new Error("missing person_id");

    public PersonRepository(){
        this.table = DynamoDB.getTable(TABLE_NAME, Person.class);
    }

    public Person create(Person person) throws Error {
        if(person.getPersonId() == null || person.getPersonId().isEmpty()){
            throw ERROR_MISSING_PERSON_ID;
        }

        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(LocalDateTime.now());

        table.putItem(person);

        return person;
    }

    public Person getPersonById(String personId) throws Error {
        if(personId.isEmpty()) {
            throw ERROR_MISSING_PERSON_ID;
        }

        Key key = Key.builder()
                .partitionValue(personId)
                .build();

        return table.getItem(i -> i.key(key));
    }

    protected void initMock(DynamoDbClient dynamoDbClient, DynamoDbTable<Person> table){
        this.table = table;
        DynamoDB.initMock(dynamoDbClient);
    }
}
