import { Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = ({ show }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`bg-light min-vh-100 p-3 shadow-lg z-3 sidebar ${show ? "open" : ""}`}
      style={{
        width: "250px",
        flexShrink: 0,
      }}
    >
      <ul className="d-flex flex-column list-unstyled mt-3">
        <li className="mt-3">
          <Link
            to="/"
            className={
              path === "/" ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Dashboard
          </Link>
        </li>
        <li className="mt-3">
          <Link
            to="/leads"
            className={
              path === "/leads" ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Leads
          </Link>
        </li>
        <li className="mt-3">
          <Link
            to="/sales"
            className={
              path === "/sales" ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Sales
          </Link>
        </li>
        <li className="mt-3">
          <Link
            to="/agents"
            className={
              path === "/agents" ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Agents
          </Link>
        </li>
        <li className="mt-3">
          <Link
            to="/reports"
            className={
              path === "/reports" ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
