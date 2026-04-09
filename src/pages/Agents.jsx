import { Link } from "react-router-dom";
import useAgentContext from "../contexts/AgentContext";
import useLeadContext from "../contexts/LeadContext";

const Agents = () => {
  const { agents } = useAgentContext();
  // console.log(agents);
  const { leads } = useLeadContext();
  // console.log(leads);

  const agentsWithLeads =
    agents &&
    leads &&
    agents.map((agent) => {
      const assignedLeads = leads.filter((lead) =>
        lead.salesAgent ? lead.salesAgent._id === agent._id : false,
      );

      return {
        ...agent,
        leads: assignedLeads,
        leadsCount: assignedLeads.length,
      };
    });

  // console.log(agentsWithLeads);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      {leads && agents ? (
        <>
          <div className="bg-white p-4 rounded-2 mb-5">
            <div className="d-flex justify-content-between mb-3">
              <h3>Agents List</h3>
              <Link
                to="/add-agent"
                className="btn text-white fw-semibold"
                style={{ backgroundColor: "#4550b8" }}
              >
                + Add New Agent
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className="text-secondary">Agent Name</th>
                    <th className="text-secondary">Email</th>
                    <th className="text-secondary">Leads Assigned</th>
                    <th className="text-secondary">Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {agentsWithLeads.map((agent) => (
                    <tr key={agent._id}>
                      <td className="py-3 fw-semibold">{agent.name}</td>
                      <td className="py-3 fw-semibold">{agent.email}</td>
                      <td className="py-3 fw-semibold">
                        {agent.leadsCount} Leads
                      </td>
                      <td className="py-3 fw-semibold">
                        {formatDate(agent.createdAt)}
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

export default Agents;
