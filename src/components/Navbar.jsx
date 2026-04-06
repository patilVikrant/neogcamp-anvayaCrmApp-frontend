import { useLocation } from "react-router-dom";
import logo from "../assets/anvaya_logo.png";
const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  // console.log(location.pathname);

  const getTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/leads") return "Leads";
    if (path.startsWith("/leads/")) return "Lead Details";
    if (path === "/add-lead") return "Add New Lead";
    if (path === "/sales") return "Sales";
    if (path === "/agents") return "Sales Agents";
    if (path === "/add-agent") return "Add New Sales Agent";
    if (path === "/reports") return "Reports";

    return "Anvaya CRM";
  };

  return (
    <nav
      className="navbar bg-light px-4 shadow-sm position-relative"
      style={{ zIndex: 1000 }}
    >
      <button
        className="btn btn-outline-secondary d-md-none"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div className="d-flex align-items-center">
        <img src={logo} width="35" className="me-2" alt="logo" />
        <h4>ANVAYA CRM</h4>
      </div>
      <div className="flex-grow-1 text-center">
        <h4>{getTitle()}</h4>
      </div>
    </nav>
  );
};

export default Navbar;
