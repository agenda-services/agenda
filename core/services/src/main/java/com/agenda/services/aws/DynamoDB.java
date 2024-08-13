package com.agenda.services.aws;

import com.agenda.services.environment.Environment;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

public class DynamoDB {
    DynamoDB() {
        throw new UnsupportedOperationException("Cannot instantiate this class");
    }

    private static DynamoDbClient dynamoDbClient;
    private static final Region REGION = Region.of(Environment.getString("AWS_REGION"));

    public static DynamoDbClient getInstance() {
        if (dynamoDbClient != null) {
            return dynamoDbClient;
        }

        synchronized (DynamoDB.class) {
            if (dynamoDbClient == null) {
                dynamoDbClient = DynamoDbClient.builder()
                        .region(DynamoDB.REGION)
                        .credentialsProvider(DefaultCredentialsProvider.create())
                        .build();
            }
        }

        return dynamoDbClient;
    }

    public static <T> DynamoDbTable<T> getTable(String tableName, Class<T> beanClass){
        return DynamoDbEnhancedClient.builder()
                .dynamoDbClient(dynamoDbClient)
                .build()
                .table(tableName, TableSchema.fromBean(beanClass));
    }

    public static void initMock(DynamoDbClient client) {
        dynamoDbClient = client;
    }
}
