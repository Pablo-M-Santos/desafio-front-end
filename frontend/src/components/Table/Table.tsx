import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";
import SearchBar from "../Search/SearchBar";
import { User } from "../../types/User";
import { formatPhone } from "../../utils/formatPhone";
import "./Table.css";

const Table: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

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

  return (
    <div className="container">
      <div className="tituloPesquisa">
        <h1 className="titulo">Funcionários</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <table border={1} className="table-container">
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
          {filteredUsers.map((user) => (
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
    </div>
  );
};

export default Table;
