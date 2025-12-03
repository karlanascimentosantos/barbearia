import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginMobile } from "../utils/api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const stored = await AsyncStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    }
    loadUser();
  }, []);

  async function signIn(email, senha) {
    const result = await loginMobile(email, senha);

    if (!result.ok) return result;

    setUser(result.user);
    await AsyncStorage.setItem("user", JSON.stringify(result.user));

    return { ok: true };
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
