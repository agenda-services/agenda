import { render } from "@testing-library/react";
import { Login } from ".";
import { BrowserRouter } from "react-router-dom";

describe("Login page", () => {
  it("renders Login page", () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(container.textContent).toContain("Ingresar");
  });
});
