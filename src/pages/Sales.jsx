import useLeadContext from "../contexts/LeadContext";
import StatsCard from "../components/statsCard";
import "../css/statscard.css";
import LeadsTable from "../components/LeadsTable";

const Sales = () => {
  const { leads } = useLeadContext();
  // console.log(leads);

  const totalNumberOfLeads = leads && leads.length;
  // console.log(totalNumberOfLeads);

  const closedLeads = leads && leads.filter((lead) => lead.status === "Closed");
  // console.log(closedLeads);

  const numberOfClosedLeads = closedLeads && closedLeads.length;
  // console.log(numberOfClosedLeads);

  const totalTimeToClose =
    closedLeads && closedLeads.reduce((acc, curr) => acc + curr.timeToClose, 0);
  // console.log(totalTimeToClose);

  const averageTimeToClose =
    totalTimeToClose && Math.ceil(totalTimeToClose / numberOfClosedLeads);
  // console.log(averageTimeToClose);

  const numberOfOpenLead = totalNumberOfLeads - numberOfClosedLeads;
  // console.log(numberOfOpenLead);

  const salesPageStats = [
    { id: 1, title: "Total Leads", value: totalNumberOfLeads },
    { id: 2, title: "Closed Leads", value: numberOfClosedLeads },
    {
      id: 3,
      title: "Avg Time to Close Lead",
      value: `${averageTimeToClose} days`,
    },
    { id: 4, title: "Open Leads", value: numberOfOpenLead },
  ];

  return (
    <div className="bg-light min-vh-100 p-4">
      {leads ? (
        <>
          <div className="bg-white p-4 rounded-2 mb-4">
            <h3 className="pb-2 border-bottom mb-2">Sales Overview</h3>
            <div className="statscard-container">
              {salesPageStats.map((stats) => (
                <StatsCard
                  key={stats.id}
                  title={stats.title}
                  value={stats.value}
                />
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-2 mb-5">
            <h3 className="mb-2">Closed Leads</h3>
            <LeadsTable leads={closedLeads} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Sales;
