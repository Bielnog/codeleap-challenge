import { createContext, useContext, useEffect, useState } from "react";
import { getUsername, setUsername as saveUsername } from "../utils/username";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      const stored = await getUsername();
      if (stored) {
        setUsernameState(stored);
      }
    };
    loadUsername();
  }, []);

  const login = async (newUsername: string) => {
    await saveUsername(newUsername);
    setUsernameState(newUsername);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("username");
    setUsernameState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!username,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
