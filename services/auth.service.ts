export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function register(data: RegisterData) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}
import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return result;
}