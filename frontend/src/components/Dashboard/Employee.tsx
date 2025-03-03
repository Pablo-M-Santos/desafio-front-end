import Card from "../Card/card";

function Employee() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <Card title="Total Funcionários" value={250} />
      <Card title="Cargos Diferentes" value={12} />
    </div>
  );
}

export default Employee;
