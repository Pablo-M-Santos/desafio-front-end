import { User } from "../types/User";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3001/employees");
  return response.json();
}
