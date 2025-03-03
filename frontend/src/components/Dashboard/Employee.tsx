import Card from "../Card/card";
import "./Employee.css";
import { useEmployees } from "../../services/useEmployees";

function Employee() {
  const totalEmployees = useEmployees();
  return (
    <div>
      <h1 className="titulo">Visão Geral dos Funcionários</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Card title="Total Funcionários" value={totalEmployees} />
        <Card title="Cargos Diferentes" value={12} />
      </div>
    </div>
  );
}

export default Employee;
