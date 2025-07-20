import axios from 'axios';
import { API_URL } from '../utils/constants';

// Criar instância do axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Função helper para adicionar token manualmente
export const addAuthHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Função helper para remover token
export const removeAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
}; 