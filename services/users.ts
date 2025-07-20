import { UsersResponse } from '../types/users';
import { api } from './api';

export const usersService = {
  async getUsers(page: number = 1, limit: number = 10): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>('/users', {
      params: { page, limit },
    });
    return response.data;
  },
}; 