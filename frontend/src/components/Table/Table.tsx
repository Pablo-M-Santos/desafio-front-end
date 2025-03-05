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
  const [turnoScreen, setturnoScreen] = useState<boolean>(
    window.innerWidth <= 1880
  );
  const [enderecoScreen, setenderecoScreen] = useState<boolean>(
    window.innerWidth <= 1800
  );
  const [emailScreen, setemailScreen] = useState<boolean>(
    window.innerWidth <= 1700
  );
  const [dataScreen, setdataScreen] = useState<boolean>(
    window.innerWidth <= 1400
  );
  const [telefoneScreen, settelefoneScreen] = useState<boolean>(
    window.innerWidth <= 1200
  );
  const [salarioScreen, setsalarioScreen] = useState<boolean>(
    window.innerWidth <= 1000
  );
  const [statusScreen, setstatusScreen] = useState<boolean>(
    window.innerWidth <= 800
  );
  const [nivelScreen, setnivelScreen] = useState<boolean>(
    window.innerWidth <= 700
  );
  const [departamentoScreen, setdepartamentoScreen] = useState<boolean>(
    window.innerWidth <= 600
  );

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });

    const handleResize = () => {
      setturnoScreen(window.innerWidth <= 1880);
      setenderecoScreen(window.innerWidth <= 1800);
      setemailScreen(window.innerWidth <= 1700);
      setdataScreen(window.innerWidth <= 1400);
      settelefoneScreen(window.innerWidth <= 1200);
      setsalarioScreen(window.innerWidth <= 1000);
      setstatusScreen(window.innerWidth <= 800);
      setnivelScreen(window.innerWidth <= 700);
      setdepartamentoScreen(window.innerWidth <= 600);

      if (window.innerWidth > 1880) {
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
            <th>DEPARTAMENTO</th>
            <th>NÍVEL</th>
            <th>STATUS</th>
            <th>SALÁRIO</th>
            <th>TELEFONE</th>
            <th>DATA DE ADMISSÃO</th>
            <th>EMAIL</th>
            <th>ENDEREÇO</th>
            <th>TURNO</th>
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
                <td>{user.department}</td>
                <td>{user.level}</td>
                <td>{user.status}</td>
                <td>{user.salary}</td>
                <td>{formatPhone(user.phone)}</td>
                <td>{new Date(user.admission_date).toLocaleDateString()}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.shift}</td>
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
                  <td colSpan={12} className="dropdown-content">
                    <div className="dropdown-detail">
                      {departamentoScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Departamento</h2>
                          <span>{user.department}</span>
                        </div>
                      )}
                      {nivelScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Nível</h2>
                          <span>{user.level}</span>
                        </div>
                      )}
                      {statusScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Status</h2>
                          <span>{user.status}</span>
                        </div>
                      )}
                      {salarioScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Salário</h2>
                          <span>{user.salary}</span>
                        </div>
                      )}
                      {telefoneScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Telefone</h2>
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {dataScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Data de Admissão</h2>
                          <span>
                            {new Date(user.admission_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {emailScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Email</h2>
                          <span>{user.email}</span>
                        </div>
                      )}
                      {enderecoScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Endereço</h2>
                          <span>{user.address}</span>
                        </div>
                      )}
                      {turnoScreen && (
                        <div className="dropdown-detail-item">
                          <h2>Turno</h2>
                          <span>{user.shift}</span>
                        </div>
                      )}
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
