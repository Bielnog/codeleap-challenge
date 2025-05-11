import Modal from "../Modal/Modal";
import "../../styles/ModalSignUp.scss";

import { useSignUp } from "./ModalSignUp";
import BaseButton from "../BaseComponents/BaseButton/BaseButton";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalSignUp() {
  const { name, haveName, handleNameChange, onSubmit } = useSignUp();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const updateDisabledState = async () => {
      try {
        await AsyncStorage.setItem("haveName", JSON.stringify(haveName));
        setDisabled(!haveName);
      } catch (error) {
        console.error("Error saving to AsyncStorage", error);
      }
    };

    updateDisabledState();
  }, [haveName]);

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
          <BaseButton
            disabled={disabled}
            onClick={onSubmit}
            buttonText="ENTER"
          />
        </div>
      </>
    </Modal>
  );
}
