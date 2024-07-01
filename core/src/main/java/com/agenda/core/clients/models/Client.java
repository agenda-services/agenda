package com.agenda.core.clients.models;
import com.google.gson.annotations.SerializedName;
import lombok.*;

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
@Document(collection = "clients")
public class Client {
    @Id
    @Field("id")

    private String id;

    @SerializedName("first_name")
    private String firstName;

    @SerializedName("last_name")
    private String lastName;

    @SerializedName("phone_number")
    private String phoneNumber;

    @SerializedName("email")
    private String email;

    @SerializedName("address")
    private String address;

    @CreatedDate
    @SerializedName("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @SerializedName("updated_at")
    private LocalDateTime updatedAt;

    public Client(String id, String firstName, String lastName, String phoneNumber, String email, String address) throws Exception {
        this.setId(id);
        this.firstName = firstName != null ? firstName.trim() : "" ;
        this.lastName =  lastName != null ? lastName.trim() : "" ;
        this.phoneNumber =  phoneNumber != null ? phoneNumber.trim() : "" ;
        this.email =  email != null ? email.trim() : "" ;
        this.address =  address != null ? address.trim() : "" ;
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

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
