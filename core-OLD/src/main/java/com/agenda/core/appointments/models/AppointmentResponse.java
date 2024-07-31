package com.agenda.core.appointments.models;

import com.agenda.core.clients.models.Client;
import com.google.gson.annotations.SerializedName;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

public class AppointmentResponse {
    @Id
    @Field("id")

    private String id;

    @SerializedName("client")
    private Client client;

    private LocalDateTime date;

    @CreatedDate
    @SerializedName("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @SerializedName("updated_at")
    private LocalDateTime updatedAt;

}
