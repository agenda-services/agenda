package com.agenda.appointments.models;
import lombok.*;
import com.google.gson.annotations.SerializedName;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.LocalDateTime;

@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@DynamoDbBean
public class Person {
    @SerializedName("person_id")
    private String personId;
    @SerializedName("first_name")
    private String firstName;
    @SerializedName("last_name")
    private String lastName;
    @SerializedName("phone_number")
    private String phoneNumber;
    @SerializedName("created_at")
    private LocalDateTime createdAt;
    @SerializedName("updated_at")
    private LocalDateTime updatedAt;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("person_id")
    public String getPersonId() {
        return personId;
    }

    @DynamoDbAttribute("first_name")
    public String getFirstName() {
        return firstName;
    }

    @DynamoDbAttribute("last_name")
    public String getLastName() {
        return lastName;
    }

    @DynamoDbAttribute("phone_number")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @DynamoDbAttribute("created_at")
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @DynamoDbAttribute("updated_at")
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
