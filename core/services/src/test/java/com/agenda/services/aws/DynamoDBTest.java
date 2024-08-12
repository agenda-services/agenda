package com.agenda.services.aws;

import org.junit.jupiter.api.Test;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class DynamoDBTest {

    @Test
    void getInstance() {
        DynamoDB.initMock(mock(DynamoDbClient.class));

        DynamoDbClient instanceOne = DynamoDB.getInstance();
        DynamoDbClient instanceTwo = DynamoDB.getInstance();

        assertEquals(instanceOne, instanceTwo);
    }
}
