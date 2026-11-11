export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthDetails {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}