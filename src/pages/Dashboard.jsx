import useLeadContext from "../contexts/LeadContext";
import StatsCard from "../components/statsCard";
import "../css/statscard.css";
import LeadsTable from "../components/LeadsTable";

const Dashboard = () => {
  const { leads } = useLeadContext();
  // console.log(leads);
  const totalNumberOfLeads = leads && leads.length;
  const leadsAddedLastWeek = (leads) => {
    const currentDate = new Date();
    const dateSevenDaysAgo = new Date();
    dateSevenDaysAgo.setDate(currentDate.getDate() - 7);

    return leads.filter((lead) => {
      const createdDate = new Date(lead.createdAt);
      return createdDate >= dateSevenDaysAgo;
    });
  };

  const newLeads = leads && leadsAddedLastWeek(leads);
  const numberOfNewLeads = newLeads && newLeads.length;

  const contactedLeads =
    leads && leads.filter((lead) => lead.status === "Contacted");
  const numberOfContactedLeads = contactedLeads && contactedLeads.length;

  const qualifiedLeads =
    leads && leads.filter((lead) => lead.status === "Qualified");
  const numberOfQualifiedLeads = qualifiedLeads && qualifiedLeads.length;

  // console.log(totalNumberOfLeads);
  // console.log(numberOfNewLeads);
  // console.log(numberOfContactedLeads);
  // console.log(numberOfQualifiedLeads);

  const dashboardStats = [
    { id: 1, title: "Total Leads", value: totalNumberOfLeads },
    { id: 2, title: "New Leads", value: numberOfNewLeads },
    { id: 3, title: "Contacted Leads", value: numberOfContactedLeads },
    { id: 4, title: "Qualified Leads", value: numberOfQualifiedLeads },
  ];

  // console.log(dashboardStats);

  const recentlyAddedLeads = leads && leads.slice(-7).reverse();
  // console.log(recentlyAddedLeads);

  return (
    <div className="bg-light min-vh-100 p-4">
      {leads ? (
        <>
          <div className="bg-white p-4 rounded-2 mb-4">
            <h3 className="pb-2 border-bottom mb-2">Leads Overview</h3>
            <div className="statscard-container">
              {dashboardStats.map((stats) => (
                <StatsCard
                  key={stats.id}
                  title={stats.title}
                  value={stats.value}
                />
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-2 mb-5">
            <h3 className="mb-2">Recent Leads</h3>
            <LeadsTable leads={recentlyAddedLeads} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Dashboard;
