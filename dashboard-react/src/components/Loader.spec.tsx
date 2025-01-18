import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader.tsx";

describe("Loading component", () => {
  it("renders the component", async () => {
    render(<Loader />);
    expect(await screen.findAllByTestId("loader")).toBeTruthy();
  });
});
