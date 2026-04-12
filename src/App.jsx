import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import AddLead from "./pages/AddLead";
import EditLead from "./pages/EditLead";
import Sales from "./pages/Sales";
import Agents from "./pages/Agents";
import AddAgent from "./pages/AddAgent";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import LeadProvider from "./contexts/LeadProvider";
import AgentProvider from "./contexts/AgentProvider";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  // console.log(showSidebar);

  return (
    <LeadProvider>
      <AgentProvider>
        <Router>
          <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
          <div className="d-flex position-relative">
            <Sidebar show={showSidebar} />
            <div className="flex-grow-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/:id" element={<LeadDetails />} />
                <Route path="/add-lead" element={<AddLead />} />
                <Route path="/edit-lead/:id" element={<EditLead />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/add-agent" element={<AddAgent />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
          />
        </Router>
      </AgentProvider>
    </LeadProvider>
  );
}

export default App;
