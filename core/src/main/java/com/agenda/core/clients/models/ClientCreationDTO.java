package com.agenda.core.clients.models;

import com.agenda.core.shared.generator.id.GeneratorIDFactory;
import com.google.gson.annotations.SerializedName;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ClientCreationDTO {

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

    public ClientCreationDTO(String firstName, String lastName, String phoneNumber, String email, String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }

    public Client toClient() throws Exception{
        String id = GeneratorIDFactory.generateClientID();
        return new Client(id, this.firstName, this.lastName, this.phoneNumber, this.email, this.address);
    }

    @Override
    public String toString() {
        return "ClientCreationDTO{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
