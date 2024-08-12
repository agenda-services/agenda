package com.agenda.services.environment;

import io.github.cdimascio.dotenv.Dotenv;

public class Environment {
    private static final String ENVIRONMENT_PATH = "..\\";

    private static Dotenv init() {
        return Dotenv.configure().directory(ENVIRONMENT_PATH).load();
    }

    public static String getString(String name){
        return Environment.init().get(name);
    }
}
