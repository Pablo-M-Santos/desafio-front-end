import "./Navbar.css";
import logo from "../../assets/Logo2.png";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo BeTalent" className="logo" />
        </nav>
    );
};

export default Navbar;