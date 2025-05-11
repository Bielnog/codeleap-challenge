import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { loginWithUsername, signInWithCredentials } from "./loginWithUsername";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, username?: string) => Promise<void>;
  loginAsGuest: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

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
    const credential = await signInAnonymously(auth);
    await updateProfile(credential.user, { displayName: username });
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
