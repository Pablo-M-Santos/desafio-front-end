import { User } from "../types/User";
import { formatPhone } from "./formatPhone";

// Função para normalizar o texto (remover acentuação)
const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// Função para formatar e limpar os dados da data (remover barras)
const normalizeDate = (date: string) => {
    return date.replace(/\//g, "").toLowerCase(); // Remover barras da data
};


const normalizePhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, ""); // Remove qualquer coisa que não seja número
};

export const searchUsers = (query: string, users: User[]): User[] => {
    const lowerQuery = query.replace(/[^0-9]/g, "");

    return users.filter((user) => {
        const formattedPhone = normalizePhone(formatPhone(user.phone));
        const formattedDate = normalizeDate(new Date(user.admission_date).toLocaleDateString());

        return (
            normalizeText(user.name).includes(lowerQuery) ||
            normalizeText(user.job).includes(lowerQuery) ||
            formattedPhone.includes(lowerQuery) ||
            formattedDate.includes(lowerQuery)
        );
    });
};
