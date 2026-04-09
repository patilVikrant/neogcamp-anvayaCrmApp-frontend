import { AgentContext } from "./AgentContext";
import api from "../api/axiosConfig";
import { useEffect, useState } from "react";

export default function AgentProvider({ children }) {
  const [agents, setAgents] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await api.get("/agents");
      setAgents(res.data);
    };

    fetchAgents();
  }, []);

  const addNewAgent = async (agent) => {
    const newAgent = await api.post("/agents", agent);
    setAgents((prevValue) => [...prevValue, newAgent.data.agent]);
  };

  const deleteAgent = async (id) => {
    const deletedAgent = await api.delete(`/agents/${id}`);
    setAgents((prevValue) =>
      prevValue.filter((agent) => agent._id !== deletedAgent.data.agent._id),
    );
  };

  const getTopAgentsByClosedLeads = (leads, agents) => {
    const closedLeads = leads.filter((lead) => lead.status === "Closed");

    const agentsWithClosedLeads = agents
      .map((agent) => {
        const assignedClosedLeads = closedLeads.filter((lead) =>
          lead.salesAgent ? lead.salesAgent._id === agent._id : false,
        );
        return {
          ...agent,
          closedLeads: assignedClosedLeads,
          closedLeadsCount: assignedClosedLeads.length,
        };
      })
      .sort((a, b) => b.closedLeadsCount - a.closedLeadsCount)
      .slice(0, 5);

    return agentsWithClosedLeads;
  };

  return (
    <AgentContext.Provider
      value={{ agents, addNewAgent, getTopAgentsByClosedLeads, deleteAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
}
