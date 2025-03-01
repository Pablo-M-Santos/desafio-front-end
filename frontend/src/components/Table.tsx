import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import SearchBar from "./SearchBar";
import { User } from "../types/User";
import { formatPhone } from "../utils/formatPhone";

const PAGE = 9;

const Table: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.job.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.includes(query)
    );
    setFilteredUsers(filtered);
  };

  const startIndex = (currentPage  - 1) * PAGE;
  const endIndex = startIndex + PAGE;
  const currentUsers  = filteredUsers.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredUsers.length / PAGE);
  
  return (
    <div>
    <SearchBar onSearch={handleSearch} />
    <table border={1}>
          <thead>
              <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Data de Admissão</th>
                  <th>Telefone</th>
              </tr>
          </thead>
          <tbody>
          {currentUsers.map((user) => (
                  <tr key={user.id}>
                      <td>
                          <img src={user.image} alt={user.name} width="50" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.job}</td>
                      <td>{new Date(user.admission_date).toLocaleDateString()}</td>
                      <td>{formatPhone(user.phone)}</td>
                  </tr>
              ))}
          </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          ⬅ Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Próxima ➡
        </button>
      </div>      
      </div>
  );
};

export default Table;
