import { FunctionComponent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<ModalProps> = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    setShouldRender(true);

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 10);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!shouldRender) return null;

  return createPortal(
    <div data-testid="modal">
      <div
        data-testid="modal-overlay"
        className={`fixed inset-0 bg-black/50 z-6 transition-opacity duration-100 ease-in-out ${isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        data-testid="modal-content"
        className={`flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg bg-white min-w-[300px] min-h-[400px] transition-all duration-100 ease-in-out ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
