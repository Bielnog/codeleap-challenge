import "../../styles/ModalSignUp.scss";
import { Tooltip } from "react-tooltip";
import { FiInfo } from "react-icons/fi";
import BaseButton from "../../components/BaseComponents/BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import { validateEmail } from "../../utils/helpers";
import Modal from "../Modal/Modal";

export default function ModalSignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const isValidEmail = validateEmail(email);
  const isValidPassword = password.length >= 6;
  const isValidUsername = username.trim().length > 0;
  const formIsValid = isValidEmail && isValidPassword && isValidUsername;

  const handleSubmit = async () => {
    if (!formIsValid) return;
    
    try {
      await login(email, password, username);
      navigate("/codeleap-challenge/main", { replace: true });
    } catch (err) {
      let errorMessage = "An unknown error occurred";
      
      if (err instanceof Error) {
        switch (err.message) {
          case "Username already exists":
            errorMessage = "This username is already taken";
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            errorMessage = "Email already registered";
            break;
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "Invalid email address";
            break;
          case "Firebase: Error (auth/weak-password).":
            errorMessage = "Password should be at least 6 characters";
            break;
          default:
            errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Modal>
      <div className="modal-header">
        <h2 className="modal-title">Welcome to CodeLeap network!</h2>
      </div>

      <div className="modal-body">
        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Username Input */}
        <p className="modal-text">Choose your username</p>
        <input
          type="text"
          className="modal-input"
          placeholder="Ex: JohnDoe123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Input */}
        <p className="modal-text">Email address</p>
        <input
          type="email"
          className={`modal-input ${email && !isValidEmail ? "invalid" : ""}`}
          placeholder="Ex: john.doe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <p className="modal-text">
          Password
          <span
            data-tooltip-id="password-tooltip"
            data-tooltip-content="Password must be at least 6 characters"
            style={{ marginLeft: "8px" }}
          >
            <FiInfo size={16} />
          </span>
        </p>
        <input
          type="password"
          className={`modal-input ${password && !isValidPassword ? "invalid" : ""}`}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Tooltip id="password-tooltip" place="right" />
      </div>

      <div className="modal-footer">
        <BaseButton
          disabled={!formIsValid}
          onClick={handleSubmit}
          buttonText="CREATE ACCOUNT"
        />
      </div>
    </Modal>
  );
}