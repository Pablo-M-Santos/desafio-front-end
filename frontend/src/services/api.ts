import { User } from "../types/User";

export async function fetchUsers(): Promise<User[]> {
  const apiUrl = "http://localhost:3001/employees";
  const response = await fetch(apiUrl);
  return response.json();
}
