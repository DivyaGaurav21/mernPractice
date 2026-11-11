import axios from "axios";
import type { AuthDetails, AuthResponse, User } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("todo-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

export async function signIn(details: AuthDetails): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/auth/login", details);
  return response.data;
}

export async function signUp(details: AuthDetails): Promise<AuthResponse> {
  console.log(details , "details")
  const response = await api.post<AuthResponse>("/api/auth/signup", details);
  return response.data;
}

export function readStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem("todo-user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  } catch {
    localStorage.removeItem("todo-user");
    return null;
  }
}
