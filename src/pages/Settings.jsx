import useLeadContext from "../contexts/LeadContext";
import useAgentContext from "../contexts/AgentContext";
import { toast } from "react-toastify";

const Settings = () => {
  const { leads, setLeads, deleteLead } = useLeadContext();
  const { agents, deleteAgent } = useAgentContext();
  // console.log(leads);
  // console.log(agents);

  const handleLeadDelete = async (id) => {
    try {
      await deleteLead(id);
      toast.success("Lead deleted successfully");
    } catch (error) {
      console.log("Failed to delete the Lead", error);
    }
  };

  const handleAgentDelete = async (id) => {
    try {
      await deleteAgent(id);
      setLeads((prevValue) =>
        prevValue.map((lead) =>
          lead.salesAgent?._id === id ? { ...lead, salesAgent: null } : lead,
        ),
      );
      toast.success("Sales Agent deleted successfully");
    } catch (error) {
      console.log("Failed to delete the Agent", error);
    }
  };

  return (
    <div className="bg-light vh-100 p-4">
      {leads && agents ? (
        <div className="container h-100">
          <div className="row g-4 h-100">
            <div className="col-12 col-lg-6 h-100">
              <div className="bg-white p-4 rounded-2 shadow-sm h-100 d-flex flex-column">
                <h3 className="mb-3">Manage Agents</h3>
                <div className="flex-grow-1 overflow-auto">
                  {agents.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {agents.map((agent) => (
                        <div
                          key={agent._id}
                          className="d-flex justify-content-between align-items-center border rounded p-2"
                        >
                          <span className="fw-semibold">{agent.name}</span>

                          <button
                            onClick={() => handleAgentDelete(agent._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No agents available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 h-100">
              <div className="bg-white p-4 rounded-2 shadow-sm h-100 d-flex flex-column">
                <h3 className="mb-3">Manage Leads</h3>
                <div className="flex-grow-1 overflow-auto">
                  {leads.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {leads.map((lead) => (
                        <div
                          key={lead._id}
                          className="d-flex justify-content-between align-items-center border rounded p-2"
                        >
                          <span className="fw-semibold">{lead.name}</span>

                          <button
                            onClick={() => handleLeadDelete(lead._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No leads available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Settings;
