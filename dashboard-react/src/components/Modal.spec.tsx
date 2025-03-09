import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal.tsx";

describe("Modal component", () => {
  it("renders modal component when isOpen is true", async () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(await screen.findByTestId("modal")).toBeTruthy();
    expect(await screen.findByTestId("modal-overlay")).toBeTruthy();
    expect(await screen.findByTestId("modal-content")).toBeTruthy();
  });

  it("does not render modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByTestId("modal")).toBeNull();
  });
});
