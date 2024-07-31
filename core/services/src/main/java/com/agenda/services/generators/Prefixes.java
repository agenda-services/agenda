package com.agenda.services.generators;

public enum Prefixes {
    PERSONID("PID"),
    APPOINTMENT("AID");

    private String type;

    Prefixes(String type){
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
