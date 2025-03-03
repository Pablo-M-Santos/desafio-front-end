import { User } from "../types/User";
import { formatPhone } from "./formatPhone";


const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const normalizeDate = (date: string) => {
    return date.replace(/\//g, "").toLowerCase(); 
};


const normalizePhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, ""); 
};

export const searchUsers = (query: string, users: User[]): User[] => {
    const lowerQuery = query.toLowerCase();

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
