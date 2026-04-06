import { Link } from "react-router-dom";

const LeadsTable = ({ leads }) => {
  // console.log(leads);

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

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th className="text-secondary">Lead Name</th>
              <th className="text-secondary">Status</th>
              <th className="text-secondary">Sales Agent</th>
              <th className="text-secondary">Priority</th>
              <th className="text-secondary">Time to close</th>
              <th className="text-secondary"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="py-3 fw-semibold">{lead.name}</td>
                <td className="py-3">
                  <span
                    className={`fw-semibold ${getStatusClass(lead.status)} px-3 py-2 rounded-2`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 text-muted fw-semibold">
                  {lead.salesAgent.name}
                </td>
                <td className="py-3">
                  <span
                    className={`fw-semibold ${getPriorityClass(lead.priority)} px-3 py-2 rounded-2`}
                  >
                    {lead.priority}
                  </span>
                </td>
                <td className="py-3 text-muted fw-semibold">
                  {lead.timeToClose}d
                </td>
                <td className="py-3">
                  <Link
                    to={`/leads/${lead._id}`}
                    className="btn btn-outline-secondary fw-semibold"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeadsTable;
