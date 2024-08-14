package com.agenda.services.serializer;

import com.google.gson.annotations.SerializedName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.*;

class SerializerTest {
    private class Dummy{
        public Dummy(String id, LocalDateTime time){
            this.id = id;
            this.time = time;
        }

        @SerializedName("id")
        private String id;

        @SerializedName("time")
        private LocalDateTime time;

        public String getId() {
            return id;
        }

        public LocalDateTime getTime() {
            return time;
        }
    }

    @Test
    void fromJson() {
        Serializer serializer = new Serializer();
        Dummy dummy = serializer.fromJson("{\"id\":\"123\",\"time\":\"2016-03-16T13:56:39Z\"}", Dummy.class);

        assertThat(dummy.getId()).isEqualTo("123");
        assertThat(dummy.getTime().getYear()).isEqualTo(2016);
    }

    @Test
    void toJson() {
        Serializer serializer = new Serializer();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
        LocalDateTime dateTime = LocalDateTime.parse("2016-03-16T13:56:39Z", formatter);
        LocalDateTime time = LocalDateTime.from(dateTime);
        String json = serializer.toJson(new Dummy("123", time));

        assertThat(json).isEqualTo("{\"id\":\"123\",\"time\":\"2016-03-16T13:56:39Z\"}");
    }
}