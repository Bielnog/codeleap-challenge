import Modal from "../Modal/Modal";
import "./ModalSignUp.scss";

import { useSignUp } from "./ModalSignUp";

export default function ModalSignUp() {
  const { name, haveName, handleNameChange, onSubmit } = useSignUp();

  return (
    <Modal>
      <>
        <div className="modal-header">
          <h2 className="modal-title">Welcome to CodeLeap network!</h2>
        </div>

        <div className="modal-body">
          <p className="modal-text">Please enter your username</p>
          <input
            type="text"
            className="modal-input"
            placeholder="Ex: John doe"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="modal-footer">
          <button
            className={`modal-button ${!haveName ? "disabled" : ""}`}
            onClick={onSubmit}
            disabled={!haveName}
          >
            ENTER
          </button>
        </div>
      </>
    </Modal>
  );
}
