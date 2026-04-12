import useLeadContext from "../contexts/LeadContext";

export function usePieChartData() {
  const { leads, getDataForClosedLeads, getLeadsDataByStatus } =
    useLeadContext();

  const pieChartDataForClosedLeads = leads && getDataForClosedLeads(leads);
  const pieChartDataForLeadsStatus = leads && getLeadsDataByStatus(leads);

  if (!pieChartDataForClosedLeads && !pieChartDataForLeadsStatus) return null;

  const {
    leadByStatus,
    newLeadPercent,
    closedLeadPercent,
    proposalSentLeadPercent,
    qualifiedLeadPercent,
    contactedLeadPercent,
  } = pieChartDataForLeadsStatus;

  const dataForClosedLeads = {
    labels: [
      `Won ${pieChartDataForClosedLeads.winPercent}%`,
      `Lost ${pieChartDataForClosedLeads.lossPercent}%`,
    ],
    datasets: [
      {
        data: [
          pieChartDataForClosedLeads.wonLeads,
          pieChartDataForClosedLeads.lostLeads,
        ],
        backgroundColor: ["#61c790", "#fcad3f"],
      },
    ],
  };

  const optionsForClosedLeads = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const dataForLeadsStatus = {
    labels: [
      `Closed ${closedLeadPercent}%`,
      `Contacted ${contactedLeadPercent}%`,
      `Qualified ${qualifiedLeadPercent}%`,
      `Proposal Sent ${proposalSentLeadPercent}%`,
      `New ${newLeadPercent}%`,
    ],
    datasets: [
      {
        data: [...Object.values(leadByStatus)],
        backgroundColor: [
          "#4e79a7",
          "#f28e2c",
          "#59a14f",
          "#edc948",
          "#007bff",
        ],
      },
    ],
  };

  const optionsForLeadsStatus = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return {
    dataForClosedLeads,
    optionsForClosedLeads,
    pieChartDataForClosedLeads,
    pieChartDataForLeadsStatus,
    dataForLeadsStatus,
    optionsForLeadsStatus,
  };
}
