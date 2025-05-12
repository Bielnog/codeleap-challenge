import Modal from "../../Modal/Modal";
import { useAuth } from "../../../utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../BaseComponents/BaseButton/BaseButton";
import "../../../styles/ModalSignUp.scss";

export default function ModalLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/codeleap-challenge/main");
    } catch (err) {
      let message = "Login failed";
      if (err instanceof Error) {
        const errorCode = err.message.replace("Firebase: Error ", "").trim();

        switch (errorCode) {
          case "(auth/user-not-found)":
            message = "User not found";
            break;
          case "(auth/wrong-password)":
            message = "Invalid password";
            break;
          case "(auth/too-many-requests)":
            message = "Too many attempts. Try again later";
            break;
          default:
            message = "Login error: " + errorCode;
        }
      }
      setError(message);
    }
  };

  return (
    <Modal>
      <div className="modal-header">
        <h2 className="modal-title">Welcome Back!</h2>
      </div>

      <div className="modal-body">
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="modal-footer">
        <p className="switch-mode">
          New user? <span onClick={() => navigate("/signup")}>Sign up</span>
          <br />
          or
          <span onClick={() => navigate("/guest")}> Continue as Guest</span>
        </p>
        <BaseButton
          onClick={handleLogin}
          buttonText="LOGIN"
          disabled={!email || !password}
        />
      </div>
    </Modal>
  );
}
