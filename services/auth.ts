import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth';
import { api } from './api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/users', userData);
    return response.data;
  },
}; 