import { useEffect, useState } from "react";
import "./BaseModal.scss";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ show, onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      
    } else {
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`modal-overlay ${show ? "modal-open" : "modal-closed"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${show ? "modal-open" : "modal-closed"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
