import axios from "axios";
import type { AuthDetails, AuthResponse } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("todo-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function signIn(details: AuthDetails): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/auth/login", details);
  return response.data;
}

export async function signUp(details: AuthDetails): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/auth/signup", details);
  return response.data;
}