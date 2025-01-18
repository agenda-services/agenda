import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders correctly", async () => {
    render(<App />);
    expect(await screen.getAllByTestId("login")).toBeTruthy();
  });
});
