import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { addAuthHeader, removeAuthHeader } from '../services/api';
import { authService } from '../services/auth';
import { User } from '../types/auth';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthContextProps {
  user: User | null;
  jwt: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
      if (token) {
        setJwt(token);
        addAuthHeader(token);
        // Opcional: buscar dados do usuário logado
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setJwt(response.jwt);
      addAuthHeader(response.jwt);
      await AsyncStorage.setItem(STORAGE_KEYS.JWT_TOKEN, response.jwt);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      // Após cadastro, pode logar automaticamente ou redirecionar para login
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setJwt(null);
    removeAuthHeader();
    await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}; 