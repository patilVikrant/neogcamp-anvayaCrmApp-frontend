import useLeadContext from "../contexts/LeadContext";
import LeadsTable from "../components/LeadsTable";
import useAgentContext from "../contexts/AgentContext";
import { Link, useSearchParams } from "react-router-dom";

const Leads = () => {
  const { leads } = useLeadContext();

  const { agents } = useAgentContext();
  // console.log(agents);

  const agentsNames = agents && agents.map((agent) => agent.name);
  // console.log(agentsNames);

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);

  const status = searchParams.get("status") || "";
  const agent = searchParams.get("salesAgent") || "";
  const sortBy = searchParams.get("sortBy") || "";

  const handleFilterChange = (key, value) => {
    const params = {};

    if (status) params.status = status;
    if (agent) params.salesAgent = agent;
    if (sortBy) params.sortBy = sortBy;

    if (value) {
      params[key] = value;
    } else {
      delete params[key];
    }

    setSearchParams(params);
  };

  let filteredLeads = leads && [...leads];

  if (status) {
    filteredLeads =
      filteredLeads && filteredLeads.filter((lead) => lead.status === status);
  }

  if (agent) {
    filteredLeads =
      filteredLeads &&
      filteredLeads.filter((lead) => lead.salesAgent.name === agent);
  }

  if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    filteredLeads =
      filteredLeads &&
      filteredLeads.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
  }

  if (sortBy === "timeToClose") {
    filteredLeads =
      filteredLeads &&
      filteredLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  // console.log(filteredLeads);

  const resetBtnHandler = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      {leads && agents ? (
        <>
          <div className="bg-white p-4 rounded-2 mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h3>Leads List</h3>
              <Link
                to="/add-lead"
                className="btn text-white fw-semibold"
                style={{ backgroundColor: "#4550b8" }}
              >
                + Add New Lead
              </Link>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-12 col-lg-5">
                <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center">
                  <h5>Filters:</h5>
                  <select
                    className="form-select w-auto"
                    value={status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">Filter by Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <select
                    className="form-select w-auto"
                    value={agent}
                    onChange={(e) =>
                      handleFilterChange("salesAgent", e.target.value)
                    }
                  >
                    <option value="">Filter by Agent</option>
                    {agentsNames.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center">
                  <h5>Sort By:</h5>
                  <select
                    className="form-select w-auto"
                    value={sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                  >
                    <option value="">Sort By</option>
                    <option value="priority">Priority</option>
                    <option value="timeToClose">Time to Close</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <button
                  onClick={resetBtnHandler}
                  className="btn btn-info fw-semibold text-white"
                >
                  Reset
                </button>
              </div>
            </div>
            {filteredLeads.length !== 0 ? (
              <LeadsTable leads={filteredLeads} />
            ) : (
              <p>There no leads to show</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Leads;
