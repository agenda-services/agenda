package com.agenda.services.generators;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class GeneratorIDFactoryTest {

    @Test
    void generatePersonId() {
        assertThat(GeneratorIDFactory.generatePersonId()).contains(Prefixes.PERSON.getType());
    }

    @Test
    void generateAppointmentId() {
        assertThat(GeneratorIDFactory.generateAppointmentId()).contains(Prefixes.APPOINTMENT.getType());
    }
}