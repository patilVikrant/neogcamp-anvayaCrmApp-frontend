import React from "react";
import useLeadContext from "../contexts/LeadContext";
import useAgentContext from "../contexts/AgentContext";

const Settings = () => {
  const { leads, setLeads, deleteLead } = useLeadContext();
  const { agents, deleteAgent } = useAgentContext();
  // console.log(leads);
  // console.log(agents);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-primary bg-opacity-10 text-primary";
      case "Contacted":
        return "bg-info bg-opacity-10 text-info";
      case "Qualified":
        return "bg-success bg-opacity-10 text-success";
      case "Proposal Sent":
        return "bg-warning bg-opacity-10 text-warning";
      case "Closed":
        return "bg-secondary bg-opacity-10 text-secondary";
      default:
        return "bg-dark bg-opacity-10 text-dark";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger bg-opacity-10 text-danger";
      case "Medium":
        return "bg-dark bg-opacity-75 text-white";
      case "Low":
        return "bg-light text-dark border";
      default:
        return "bg-secondary bg-opacity-10 text-secondary";
    }
  };

  const handleLeadDelete = async (id) => {
    try {
      await deleteLead(id);
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
    } catch (error) {
      console.log("Failed to delete the Agent", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      {leads && agents ? (
        <>
          <div className="bg-white p-4 rounded-2 mb-5">
            <h3 className="mb-2">Manage Agents</h3>
            <div
              className="table-responsive"
              style={{ maxHeight: "40vh", overflowY: "auto" }}
            >
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className="text-secondary">Agent Name</th>
                    <th className="text-secondary">Email</th>
                    <th className="text-secondary">Date Joined</th>
                    <th className="text-secondary">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent._id}>
                      <td className="py-3 fw-semibold">{agent.name}</td>
                      <td className="py-3 fw-semibold">{agent.email}</td>
                      <td className="py-3 fw-semibold">
                        {formatDate(agent.createdAt)}
                      </td>
                      <td className="py-3 fw-semibold">
                        <button
                          onClick={() => handleAgentDelete(agent._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2 mb-5">
            <h3 className="mb-2">Manage Leads</h3>
            <div
              className="table-responsive"
              style={{ maxHeight: "40vh", overflowY: "auto" }}
            >
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className="text-secondary">Lead Name</th>
                    <th className="text-secondary">Status</th>
                    <th className="text-secondary">Priority</th>
                    <th className="text-secondary">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td className="py-3 fw-semibold">{lead.name}</td>
                      <td className="py-3 fw-semibold">
                        <span
                          className={`fw-semibold ${getStatusClass(lead.status)} px-3 py-2 rounded-2`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 fw-semibold">
                        <span
                          className={`fw-semibold ${getPriorityClass(lead.priority)} px-3 py-2 rounded-2`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3 fw-semibold">
                        <button
                          onClick={() => handleLeadDelete(lead._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Settings;
