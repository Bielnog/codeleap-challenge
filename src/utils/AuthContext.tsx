import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { loginWithUsername, signInWithCredentials } from "./loginWithUsername";

import type { AuthContextType } from "../types/AuthContext";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, username?: string) => {
    if (username) {
      const user = await loginWithUsername(email, password, username);
      setUser(user);
    } else {
      const user = await signInWithCredentials(email, password);
      setUser(user);
    }
  };

  const loginAsGuest = async (username: string) => {
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

    setUser(credential.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginAsGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
