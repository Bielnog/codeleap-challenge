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
        switch (err.message) {
          case "auth/user-not-found":
            message = "Nenhuma conta encontrada com este e-mail. Por favor, cadastre-se.";
            break;
          case "auth/wrong-password":
            message = "Senha incorreta. Por favor, tente novamente.";
            break;
          case "auth/invalid-email":
            message = "E-mail inválido. Por favor, insira um endereço de e-mail válido.";
            break;
          case "auth/too-many-requests":
            message = "Muitas tentativas malsucedidas. Sua conta foi temporariamente bloqueada. Tente novamente mais tarde.";
            break;
          case "auth/network-request-failed":
            message = "Erro de conexão. Verifique sua internet e tente novamente.";
            break;
          case "auth/invalid-credential":
            message = "Credenciais inválidas. Verifique seu e-mail e senha.";
            break;
          default:
            message = "Erro ao fazer login. Verifique seus dados e tente novamente.";
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
          New user?{" "}
          <span onClick={() => navigate("/codeleap-challenge/signup")}>
            Sign up
          </span>
          <br />
          or
          <span onClick={() => navigate("/codeleap-challenge/guest")}>
            {" "}Continue as Guest
          </span>
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
