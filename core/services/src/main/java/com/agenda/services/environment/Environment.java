package com.agenda.services.environment;

import io.github.cdimascio.dotenv.Dotenv;

public class Environment {
    private static final String ENVIRONMENT_PATH = "";

    Environment() {
        throw new UnsupportedOperationException("Cannot instantiate this class");
    }

    private static Dotenv init() {
//        try{
//            return Dotenv.configure().directory(ENVIRONMENT_PATH).load();
//        } catch (Exception e) {
//            return Dotenv.configure().load();
//        }
        return null;
    }

    public static String getString(String name){
//        return Environment.init().get(name);
        System.out.println(name + " " + System.getenv(name));
        return System.getenv(name);
    }

}
