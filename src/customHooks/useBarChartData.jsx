import useAgentContext from "../contexts/AgentContext";
import useLeadContext from "../contexts/LeadContext";

export function useBarChartData() {
  const { agents, getTopAgentsByClosedLeads } = useAgentContext();
  const { leads, getLeadsInPipelineByStatus } = useLeadContext();

  const topAgentsByClosedLeads =
    leads && agents && getTopAgentsByClosedLeads(leads, agents);

  const leadsInPipeline = leads && getLeadsInPipelineByStatus(leads);

  if (!topAgentsByClosedLeads && !leadsInPipeline) return null;

  const { leadsInPipelineByStatus } = leadsInPipeline;

  const dataForTopAgentsByClosedLeads = {
    labels: topAgentsByClosedLeads.map((agent) => agent.name),
    datasets: [
      {
        data: topAgentsByClosedLeads.map((agent) => agent.closedLeadsCount),
        backgroundColor: "#007bff",
      },
    ],
  };

  const optionsForTopAgentsByClosedLeads = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataForLeadsInPipeline = {
    labels: Object.keys(leadsInPipelineByStatus),
    datasets: [
      {
        data: Object.values(leadsInPipelineByStatus),
        backgroundColor: ["#4e79a7", "#f28e2c", "#59a14f", "#edc948"],
      },
    ],
  };

  const optionsForLeadsInPipeline = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const { data } = chart;
            const backgroundColors = data.datasets[0].backgroundColor;

            return data.labels.map((label, index) => ({
              text: label,
              fillStyle: backgroundColors[index],
              strokeStyle: backgroundColors[index],
            }));
          },
        },
      },
    },
  };

  return {
    dataForTopAgentsByClosedLeads,
    optionsForTopAgentsByClosedLeads,
    topAgentsByClosedLeads,
    leadsInPipeline,
    dataForLeadsInPipeline,
    optionsForLeadsInPipeline,
  };
}
