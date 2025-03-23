import { render, screen } from "@testing-library/react";
import { CancelAppointmentModal } from "./CancelAppointmentModal";

const mockAppointment = {
  date: new Date("2025-03-27T10:30:00Z"), // Fecha y hora de la cita
  firstname: "Juan",
}



describe("cancelAppointmentModal component", () => {
  const handleModalClose = vi.fn();
  const confirmAppointmentCancellation = vi.fn()

  it("renders the component", async () => {
    render(<CancelAppointmentModal handleModalClose={handleModalClose} confirmAppointmentCancellation={confirmAppointmentCancellation} person={mockAppointment.firstname} date={mockAppointment.date} />)
    expect(await screen.findAllByTestId("cancelAppointmentModal")).toBeTruthy();
  })

})