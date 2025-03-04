import Card from "../Card/card";
import "./Employee.css";
import { useEmployees } from "../../services/useEmployees";

function Employee() {
  const {
    totalEmployees,
    distinctJobs,
    averageEmployeesPerYear,
    averageEmployeesPerMonth,
    mostExperienced,
    mostRecent, 
  } = useEmployees();
  return (
    <div className="container">
      <h1 className="titulo">Visão Geral dos Funcionários</h1>
      <div className="grafico">
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
        <Card
          title="Funcionário mais Experiente"
          value={mostExperienced ? mostExperienced.name : "N/A"}
        />
        <Card
          title="Funcionário mais Novo"
          value={mostRecent ? mostRecent.name : "N/A"}
        />
      </div>
    </div>
  );
}

export default Employee;
