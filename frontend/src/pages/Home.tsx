import React from "react";
import Table from "../components/Table/Table";
import Navbar from "../components/Navbar/Navbar";
const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#F0F0F0", height: "100vh" }}>
      <Navbar />
      <Table />
    </div>
  );
};

export default Home;
