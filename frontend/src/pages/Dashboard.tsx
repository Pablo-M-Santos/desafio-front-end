import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Employee from "../components/Dashboard/Employee";
const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#F0F0F0", height: "100vh" }}>
      <Navbar />
      <Employee />
    </div>
  );
};

export default Home;
