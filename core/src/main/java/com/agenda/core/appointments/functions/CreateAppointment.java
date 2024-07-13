package com.agenda.core.appointments.functions;

import com.agenda.core.appointments.models.Appointment;
import com.agenda.core.appointments.models.AppointmentCreateDTO;
import com.agenda.core.appointments.repositories.AppointmentRepository;
import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.models.ClientCreateDTO;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.function.Function;

@EnableMongoAuditing
@Component("create-appointment")
public class CreateAppointment implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent>  {
        public AppointmentRepository appointmentRepository;
        private final Serializer serializer;

        @Autowired
        public CreateAppointment(AppointmentRepository repository) {
            this.appointmentRepository = repository;
            this.serializer = new Serializer();
        }


        private Appointment validateRequest(String appointmentData) throws Exception{
            if (appointmentData == null) {
                throw new Exception("Invalid request");
            }

            AppointmentCreateDTO appointmentCreateDTO = serializer.fromJson(appointmentData, AppointmentCreateDTO.class);
            if(appointmentCreateDTO == null){
                throw new Exception("Invalid request");
            }

            return appointmentCreateDTO.toAppointment();
        }

        private APIGatewayProxyResponseEvent process(APIGatewayProxyRequestEvent req){
            Appointment appointment;

            try {
                appointment = this.validateRequest(req.getBody());
            } catch (Exception error) {
                return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.BAD_REQUEST.value()).withBody("Invalid request: " + error);
            }

            if (appointment.getClientId().isEmpty() ){
                // Create client
                return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Invoke create client not implemented");
            }

            try{
                appointment.setCreatedAt(LocalDateTime.now());
                Appointment appointmentResponse = appointmentRepository.save(appointment);
                return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.CREATED.value()).withBody(serializer.toJson(appointmentResponse));
            } catch (Exception error) {
                return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Internal server error: " + error);
            }
        }

        @Override
        public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent input) {
            return this.process(input);
        }
}
