package com.agenda.services.environment;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class EnvironmentTest {
    @Test
    void testNotAllowedCreateObject(){
        try {
            new Environment();
        } catch (Exception e){
            assertThat(e.getMessage()).contains("Cannot instantiate this class");
        }
    }

    @Test
    void testGetString() {
        assertThat(Environment.getString("DUMMY")).isNull();
    }
}