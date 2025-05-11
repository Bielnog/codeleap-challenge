import Modal from "../Modal/Modal";
import "../../styles/ModalSignUp.scss";
import { useSignUp } from "./ModalSignUp";
import BaseButton from "../BaseComponents/BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function ModalSignUp() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const { name, haveName, handleNameChange, onSubmit } = useSignUp();

  const handleSubmit = async () => {
    const success = onSubmit();
    if (success) {
      await login(name);
      navigate("/codeleap-challenge/main", { replace: true });
    }
  };

  return (
    <Modal>
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
        <BaseButton
          disabled={!haveName}
          onClick={handleSubmit}
          buttonText="ENTER"
        />
      </div>
    </Modal>
  );
}
