import { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";
import { User } from "../types/User";

export const useEmployees = () => {
    const [employees, setEmployees] = useState<User[]>([]);

    const loadEmployees = async () => {
        try {
            const users = await fetchUsers();
            setEmployees(users);
        } catch (error) {
            console.error("Erro ao carregar funcionários", error);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return employees.length;
};
