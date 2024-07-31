package com.agenda.services.serializer;

public interface ISerializer {
    public <T> T fromJson(String json, Class<T> classOfT);
    public String toJson(Object src);
}
