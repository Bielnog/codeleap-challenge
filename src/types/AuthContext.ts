import type { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, username?: string) => Promise<void>;
  loginAsGuest: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}