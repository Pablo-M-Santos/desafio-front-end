import { User } from "../types/User";

export async function fetchUsers(): Promise<User[]> {
  const apiUrl = import.meta.env.VITE_API_URL || "https://desafio-front-end-x3cd.onrender.com/employees";
  const response = await fetch(apiUrl);
  return response.json();
}
