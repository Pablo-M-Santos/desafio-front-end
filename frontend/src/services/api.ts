import { User } from "../types/User";

export async function fetchUsers(): Promise<User[]> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/employees";
  const response = await fetch(apiUrl);
  return response.json();
}
