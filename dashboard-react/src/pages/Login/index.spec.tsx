import { render } from "@testing-library/react";
import { Login } from ".";

describe("Login page", () => {
  it("renders Login page", () => {
    const { container } = render(<Login />);
    expect(container.textContent).toContain("Ingresar");
  });
});
