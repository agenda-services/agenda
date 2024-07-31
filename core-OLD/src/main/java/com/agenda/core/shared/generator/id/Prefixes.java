package com.agenda.core.shared.generator.id;

public enum Prefixes {
    CLIENT("CID"),
    APPOINTMENT("AID");

    private String type;

    Prefixes(String type){
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
