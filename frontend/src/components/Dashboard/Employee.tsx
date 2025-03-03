import Card from "../Card/card";
import "./Employee.css";
import { useEmployees } from "../../services/useEmployees";

function Employee() {
  const {
    totalEmployees,
    distinctJobs,
    averageEmployeesPerYear,
    averageEmployeesPerMonth,
  } = useEmployees();
  return (
    <div>
      <h1 className="titulo">Visão Geral dos Funcionários</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Card title="Total Funcionários" value={totalEmployees.toString()} />
        <Card title="Cargos Diferentes" value={distinctJobs.toString()} />
        <Card
          title="Média de Novos Funcionários por Ano"
          value={averageEmployeesPerYear.toString()}
        />
        <Card
          title="Média de Novos Funcionários por Mês"
          value={averageEmployeesPerMonth.toString()}
        />
      </div>
    </div>
  );
}

export default Employee;
