import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Employee from "../components/Dashboard/Employee";
const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Employee />
    </div>
  );
};

export default Home;
