import PieChart from "../components/Pie";
import BarChart from "../components/Bar";
import { useBarChartData } from "../customHooks/useBarChartData";
import { usePieChartData } from "../customHooks/usePieChartData";

const Reports = () => {
  const pieChartData = usePieChartData();
  const barChartData = useBarChartData();

  if (!pieChartData && !barChartData)
    return (
      <div className="bg-light min-vh-100 p-4">
        <p>Loading...</p>
      </div>
    );

  const {
    dataForClosedLeads,
    optionsForClosedLeads,
    pieChartDataForClosedLeads,
    dataForLeadsStatus,
    optionsForLeadsStatus,
  } = pieChartData;

  const {
    dataForTopAgentsByClosedLeads,
    optionsForTopAgentsByClosedLeads,
    dataForLeadsInPipeline,
    optionsForLeadsInPipeline,
  } = barChartData;

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-4">
          <div className="card p-4 border-0" style={{ flex: 1 }}>
            <div className="mb-3">
              <h5 className="mb-1">Leads Closed Last Week</h5>
              <p className="text-muted mb-0">
                Total Leads:{" "}
                {pieChartDataForClosedLeads.numberOfLeadsAddedInLastSevenDays}
              </p>
            </div>
            <div style={{ height: "300px" }}>
              <PieChart
                data={dataForClosedLeads}
                options={optionsForClosedLeads}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="card p-4 border-0" style={{ flex: 2 }}>
            <div className="mb-3">
              <h5 className="mb-1">Closed Leads By Sales Agent</h5>
            </div>
            <div style={{ height: "300px" }}>
              <BarChart
                data={dataForTopAgentsByClosedLeads}
                options={optionsForTopAgentsByClosedLeads}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card p-4 border-0" style={{ flex: 1 }}>
            <div className="mb-3">
              <h5 className="mb-1">Leads in Pipeline</h5>
            </div>
            <div style={{ height: "300px" }}>
              <BarChart
                data={dataForLeadsInPipeline}
                options={optionsForLeadsInPipeline}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-4 border-0" style={{ flex: 1 }}>
            <div className="mb-3">
              <h5 className="mb-1">Leads Status Distribution</h5>
            </div>
            <div style={{ height: "300px" }}>
              <PieChart
                data={dataForLeadsStatus}
                options={optionsForLeadsStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
