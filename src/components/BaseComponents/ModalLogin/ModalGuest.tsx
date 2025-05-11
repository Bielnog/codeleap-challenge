// ModalGuest.tsx
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../BaseComponents/BaseButton/BaseButton";
import "../../../styles/ModalSignUp.scss";
import { auth, db } from "../../../firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default function ModalGuest() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleGuestLogin = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        throw new Error("Username already taken");
      }

      const credential = await signInAnonymously(auth);

      await updateProfile(credential.user, { displayName: username });
      await addDoc(usersRef, {
        uid: credential.user.uid,
        username,
        isAnonymous: true,
        createdAt: new Date(),
      });

      navigate("/main");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create guest account"
      );
    }
  };

  return (
    <Modal>
      <div className="modal-header">
        <h2 className="modal-title">Continue as Guest</h2>
      </div>

      <div className="modal-body">
        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="modal-footer">
        <p className="switch-mode">
          Already have account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
        <BaseButton
          onClick={handleGuestLogin}
          buttonText="CONTINUE"
          disabled={!username.trim()}
        />
      </div>
    </Modal>
  );
}
