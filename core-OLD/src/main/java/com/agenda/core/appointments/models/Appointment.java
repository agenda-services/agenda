package com.agenda.core.appointments.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "appointments")
public class Appointment {
    @Id
    @Field("id")

    private String id;

    @SerializedName("client_id")
    private String clientId;

    private LocalDateTime date;

    @CreatedDate
    @SerializedName("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @SerializedName("updated_at")
    private LocalDateTime updatedAt;

    public Appointment(String id, String clientId, LocalDateTime date) {
        this.id = id;
        this.clientId = clientId  != null ? clientId.trim() : "CID09bd8b2ef5e6488c899398e54a997d36";
        this.date = date;
    }

    public void setId(String id) throws Exception {
        if (id.isEmpty()){
            throw new Exception("Id is empty");
        }

        if (this.id != null && !this.id.isEmpty()){
            throw new Exception("Already has an id: " + this.id);
        }

        this.id = id;
    }

    public String getClientId() {
        return clientId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id='" + id + '\'' +
                ", clientId='" + clientId + '\'' +
                ", date=" + date +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
