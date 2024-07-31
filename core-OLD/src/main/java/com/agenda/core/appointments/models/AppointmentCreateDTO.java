package com.agenda.core.appointments.models;

import com.agenda.core.shared.generator.id.GeneratorIDFactory;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AppointmentCreateDTO {

    @SerializedName("client_id")
    private String clientId;

    private LocalDateTime date;

    public Appointment toAppointment(){
        String id = GeneratorIDFactory.generateAppointmentId();
        return new Appointment(id, this.clientId, this.date);
    }
}
