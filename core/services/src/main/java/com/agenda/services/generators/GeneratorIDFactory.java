package com.agenda.services.generators;

import java.util.UUID;

public class GeneratorIDFactory {
    private static String getToken(){
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static String generatePersonId(){
        return Prefixes.PERSON.getType() + getToken();
    }

    public static String generateAppointmentId(){
        return Prefixes.APPOINTMENT.getType() + getToken();
    }
}
