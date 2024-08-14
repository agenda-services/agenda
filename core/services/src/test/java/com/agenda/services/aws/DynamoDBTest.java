package com.agenda.services.aws;

import org.junit.jupiter.api.Test;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

class DynamoDBTest {

    @Test
    void getInstance() {
        try {
            new DynamoDB();
        } catch (Exception e){
            assertThat(e.getMessage()).contains("Cannot instantiate this class");
        }

        DynamoDB.initMock(null);

        DynamoDbClient instanceOne = DynamoDB.getInstance();
        DynamoDbClient instanceTwo = DynamoDB.getInstance();

        assertEquals(instanceOne, instanceTwo);
    }
}
