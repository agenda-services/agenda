package com.agenda.core.appointments.functions;

import com.agenda.core.appointments.models.Appointment;
import com.agenda.core.appointments.models.AppointmentResponse;
import com.agenda.core.appointments.repositories.AppointmentRepository;
import com.agenda.core.clients.models.Client;
import com.agenda.core.clients.repositories.ClientRepository;
import com.agenda.core.shared.serializer.Serializer;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
import java.util.function.Function;

@Component("list-appointments")
public class ListAppointments implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    public AppointmentRepository appointmentRepository;
    private MongoTemplate mongoTemplate;
    private final Serializer serializer;

    @Autowired
    public ListAppointments(AppointmentRepository repository,  MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.appointmentRepository = repository;
        this.serializer = new Serializer();
    }

    private int getPage(String page){
        try{
            return Integer.parseInt(page);
        } catch (NumberFormatException error){
            return 0;
        }
    }

    public List<AppointmentResponse> getAppointmentsWithClients() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("clients", "clientId", "_id", "client"),
                Aggregation.unwind("client", true)
        );

        AggregationResults<AppointmentResponse> results = mongoTemplate.aggregate(aggregation, "appointments", AppointmentResponse.class);
        return results.getMappedResults();
    }

    private APIGatewayProxyResponseEvent process(){
        try{
            List<AppointmentResponse> appointments = getAppointmentsWithClients();

            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.OK.value()).withBody(serializer.toJson(appointments));
        } catch (Exception error) {
            return new APIGatewayProxyResponseEvent().withStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).withBody("Internal server error: " + error);
        }
    }

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent input) {
        return this.process();
    }
}