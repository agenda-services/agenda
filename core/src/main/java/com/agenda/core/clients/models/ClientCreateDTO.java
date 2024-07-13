package com.agenda.core.clients.models;

import com.agenda.core.shared.generator.id.GeneratorIDFactory;
import com.google.gson.annotations.SerializedName;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ClientCreateDTO {

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

    public Client toClient() throws Exception{
        String id = GeneratorIDFactory.generateClientId();
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
