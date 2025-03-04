import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";
import SearchBar from "../Search/SearchBar";
import { Employee } from "../../types/User";
import { formatPhone } from "../../utils/formatPhone";
import { searchUsers } from "../../utils/search";
import "./Table.css";

const Table: React.FC = () => {
  const [users, setUsers] = useState<Employee[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Employee[]>([]);
  const [dropdownState, setDropdownState] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth <= 375
  );

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 375);

      if (window.innerWidth > 610) {
        setDropdownState(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = searchUsers(query, users);
    setFilteredUsers(filtered);
  };

  const toggleDropdown = (index: number) => {
    setDropdownState(dropdownState === index ? null : index);
  };

  return (
    <div className="container">
      <div className="tituloPesquisa">
        <h1 className="titulo">Funcionários</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>FOTO</th>
            <th>NOME</th>
            <th>CARGO</th>
            <th>DATA DE ADMISSÃO</th>
            <th>TELEFONE</th>
            <th className="action-column">•</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <React.Fragment key={user.id}>
              <tr className={dropdownState === index ? "selected-row" : ""}>
                <td>
                  <img src={user.image} alt={user.name} width="50" />
                </td>
                <td>{user.name}</td>
                <td>{user.job}</td>
                <td>{new Date(user.admission_date).toLocaleDateString()}</td>
                <td>{formatPhone(user.phone)}</td>
                <td className="action-column">
                  <span
                    className="material-icons"
                    onClick={() => toggleDropdown(index)}
                  >
                    {dropdownState === index ? "expand_less" : "expand_more"}
                  </span>
                </td>
              </tr>
              {dropdownState === index && (
                <tr className="dropdown-row">
                  <td colSpan={6} className="dropdown-content">
                    <div className="dropdown-detail">
                      {isSmallScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Cargo</h2>
                          <span>{user.job}</span>
                        </div>
                      )}
                      <div className="dropdown-detail-item">
                        <h2>Data de admissão</h2>
                        <span>
                          {new Date(user.admission_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="dropdown-detail-item">
                        <h2>Telefone</h2>
                        <span>{formatPhone(user.phone)}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
