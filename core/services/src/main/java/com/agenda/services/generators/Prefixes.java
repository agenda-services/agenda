package com.agenda.services.generators;

public enum Prefixes {
    PERSON("PID"),
    APPOINTMENT("AID");

    private final String type;

    Prefixes(String type){
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
