import "../../styles/Modal.scss";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="modal-container">
      <div className="modal">{children}</div>
    </div>
  );
}