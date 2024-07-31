package com.agenda.core.shared.generator.id;

import java.util.UUID;

public class GeneratorIDFactory {
    private static String getToken(){
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static String generateClientId(){
        return Prefixes.CLIENT.getType() + getToken();
    }

    public static String generateAppointmentId(){
        return Prefixes.CLIENT.getType() + getToken();
    }
}
