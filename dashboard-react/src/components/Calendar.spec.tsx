import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("Calendar component", () => {
  it("renders component calendar", async () => {
    render(<Calendar initialDate={new Date(2000, 0, 1)} />);

    expect(await screen.findAllByTestId("calendar")).toBeTruthy();
    expect((await screen.findAllByTestId("day")).length).toBe(7);
    expect((await screen.findAllByTestId("date")).length).toBe(31);
  });
});
