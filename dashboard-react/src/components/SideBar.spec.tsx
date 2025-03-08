import { fireEvent, render, screen } from "@testing-library/react";
import { SideBar } from "./SideBar";

describe("SideBar component", () => {
  const visible = true;
  const handleToggleSidebar = vi.fn();

  it("renders the component", async () => {
    render(<SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />);
    expect(await screen.findAllByTestId("sidebar")).toBeTruthy();
  });

  it("renders Navigation Button Clientes", async () => {
    render(<SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />);
    expect(await screen.findAllByTestId("clients")).toBeTruthy()
  })

  it("renders Navigation Button Calendario", async () => {
    render(<SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />);
    expect(await screen.findAllByTestId("calendar")).toBeTruthy()
  })
  it("navigates to Clients component", async () => {
    render(

      <SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />

    )
    const clientsLink = await screen.findByText("Clientes");
    fireEvent.click(clientsLink)
  })
  it("navigates to Calendar component", async () => {
    render(
      <SideBar visible={visible} handleToggleSidebar={handleToggleSidebar} />
    )
    const clientsLink = await screen.findByText("Calendario");
    fireEvent.click(clientsLink)
  })
});
