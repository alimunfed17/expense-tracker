import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { login as loginApi, register as registerApi } from "../api/authApi";

export interface User {
  id?: string;
  name: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  token: string;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = "token";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const { user, token } = res.data;
    setUser(user);
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await registerApi({ name, email, password });
    const { user, token } = res.data;
    setUser(user);
    setToken(token);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
