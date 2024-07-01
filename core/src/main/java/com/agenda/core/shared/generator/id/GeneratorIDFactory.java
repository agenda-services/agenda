package com.agenda.core.shared.generator.id;

import java.util.UUID;

public class GeneratorIDFactory {

    public static String generateClientID(){
        String uniqueID = UUID.randomUUID().toString().replace("-", "");

        return Prefixes.CLIENT.getType() + uniqueID;
    }
}
