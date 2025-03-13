import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SideBar } from "./SideBar";
import { MemoryRouter } from "react-router-dom";

describe("SideBar component", () => {
  const visible = true;
  const handleToggleSidebar = vi.fn();

  it("renders the component", async () => {
    render(<MemoryRouter><SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} /> </MemoryRouter>);

    expect(await screen.findAllByTestId("sidebar")).toBeTruthy();
  });

  it("renders Navigation Button Clientes", async () => {
    render(<MemoryRouter><SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} /> </MemoryRouter>);

    expect(await screen.findAllByTestId("clients")).toBeTruthy()
  })

  it("renders Navigation Button Calendario", async () => {
    render(<MemoryRouter><SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} /> </MemoryRouter>);

    expect(await screen.findAllByTestId("calendar")).toBeTruthy()
  })

  it("calls handleToggleSidebar when clicking on the overlay", async () => {
    render(
      <MemoryRouter>
        <SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />
      </MemoryRouter>
    );
    const overlay = screen.getByTestId("closeSidebar");

    fireEvent.click(overlay);

    await waitFor(() => {
      expect(handleToggleSidebar).toHaveBeenCalledTimes(1);
    });
  });

  it("navigates to Clients component", async () => {
    render(<MemoryRouter><SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} /> </MemoryRouter>);

    const clientsLink = await screen.findByText("Clientes");
    fireEvent.click(clientsLink)

    expect(handleToggleSidebar).toBeCalledTimes(1)

  })

  it("navigates to Calendar component", async () => {
    render(<MemoryRouter><SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} /> </MemoryRouter>);

    const calendarLink = await screen.findByText("Calendario");
    fireEvent.click(calendarLink)

    expect(handleToggleSidebar).toBeCalledTimes(1)
  })
});
