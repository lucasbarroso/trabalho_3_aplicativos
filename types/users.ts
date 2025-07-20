export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface UsersResponse {
  users: User[];
  count: number;
} 