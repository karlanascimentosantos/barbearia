

import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    async function loadUser() {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        if (usuario) {
          setUsuarioLogado(JSON.parse(usuario));
        }
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function saveUser() {
      try {
        if (usuarioLogado) {
          await AsyncStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        } else {
          await AsyncStorage.removeItem('usuario');
        }
      } catch (err) {
        console.error("Erro ao salvar usuário:", err);
      }
    }

    if (!loading) saveUser();
  }, [usuarioLogado, loading]);

  const contextValue = { usuarioLogado, setUsuarioLogado, loading };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}

