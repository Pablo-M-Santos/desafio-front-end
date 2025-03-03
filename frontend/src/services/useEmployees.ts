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

    const groupByDate = (date: string) => {
        const admissionDate = new Date(date);
        const year = admissionDate.getFullYear();
        const month = admissionDate.getMonth() + 1;
        return { year, month };
    };

    // Contabilizando os funcionários que entraram por mês e por ano
    const employeesByMonth = employees.reduce((acc, employee) => {
        const { year, month } = groupByDate(employee.admission_date);

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = 0;

        acc[year][month]++;
        return acc;
    }, {} as Record<number, Record<number, number>>);

    const employeesByYear = Object.keys(employeesByMonth).reduce((acc, year) => {
        // Garantir que 'year' seja um número antes de acessar
        const yearNumber = Number(year);
        if (employeesByMonth[yearNumber]) {
            acc[yearNumber] = Object.values(employeesByMonth[yearNumber]).reduce((sum, count) => sum + count, 0);
        }
        return acc;
    }, {} as Record<number, number>);

    // Média de funcionários por ano
    const averageEmployeesPerYear = Object.values(employeesByYear).reduce(
        (sum, count) => sum + count,
        0
    ) / Object.keys(employeesByYear).length;

    // Média de funcionários por mês
    const totalMonths = Object.keys(employeesByMonth).reduce((sum, year) => {
        const monthsInYear = Object.keys(employeesByMonth[Number(year)]).length;
        return sum + monthsInYear;
    }, 0);

    const averageEmployeesPerMonth = Math.floor(employees.length / totalMonths);


    // Quantidade de funcionários
    const totalEmployees = employees.length;
    // Quantidade de cargos
    const distinctJobs = new Set(employees.map((employee) => employee.job)).size;

    return {
        totalEmployees,
        distinctJobs,
        employeesByMonth,
        employeesByYear,
        averageEmployeesPerYear,
        averageEmployeesPerMonth,
    };
};
