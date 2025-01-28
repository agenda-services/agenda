import { render, screen } from "@testing-library/react";
import { AppointmentCard } from "./AppointmentCard";
import { Appointment } from "../../../models/Appointment";

describe("AppointmentCard compnent", () => {
  it("return label of missing days to appoointment", async () => {
    const now = new Date();

    now.setDate(now.getDate() + 1);

    const appointment: Partial<Appointment> = {
      date: now
    };

    const { rerender } = render(
      <AppointmentCard
        appointment={appointment as Appointment}
        reprogram={() => {}}
      />
    );

    let missingDateLabel = (await screen.findByTestId("missing-days"))
      .innerHTML;

    expect(missingDateLabel).toEqual("Mañana");

    now.setDate(now.getDate() - 1);
    now.setHours(now.getHours() - 2);

    appointment.date = now;

    rerender(
      <AppointmentCard
        appointment={appointment as Appointment}
        reprogram={() => {}}
      />
    );

    missingDateLabel = (await screen.findByTestId("missing-days")).innerHTML;

    expect(missingDateLabel).toEqual("Hoy");
  });
});
