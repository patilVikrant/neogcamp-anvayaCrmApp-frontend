import useAgentContext from "../contexts/AgentContext";
import useLeadContext from "../contexts/LeadContext";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const { addNewLead, formData, setFormData } = useLeadContext();

  const { agents } = useAgentContext();
  // console.log(agents);

  const navigate = useNavigate();

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const tagOptions = [
    "High Value",
    "Follow-up",
    "Demo Requested",
    "Sustainability",
    "Real Estate",
    "Tech Client",
    "Logistics",
    "Design",
    "Retail",
    "Startup",
    "Food Industry",
    "Automotive",
    "Software",
    "Export",
    "Aviation",
    "Lighting",
    "Construction",
    "Shipping",
    "Pharma",
    "Electronics",
    "AI",
    "Transport",
    "Solar",
    "Technology",
    "Mining",
    "Robotics",
    "Telecom",
    "Security",
  ];

  const priorities = ["High", "Medium", "Low"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      tags: checked
        ? [...prevValue.tags, value]
        : prevValue.tags.filter((tag) => tag !== value),
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(formData);
      await addNewLead(formData);

      setFormData({
        name: "",
        source: "",
        salesAgent: "",
        status: "New",
        tags: [],
        timeToClose: "",
        priority: "High",
      });
      navigate("/leads");
    } catch (error) {
      console.log("Failed to add the lead", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      {agents ? (
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="card border-0 p-2 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white border-0">
              <div>
                <h2 className="mb-1 fw-bold">Add New Lead</h2>
                <p className="text-muted mb-0">
                  Fill in the details below to create a new lead.
                </p>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Lead Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control mb-3"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Source:</label>
                    <select
                      className="form-select mb-3"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Sales Agent
                    </label>
                    <select
                      className="form-select mb-3"
                      value={formData.salesAgent}
                      onChange={handleChange}
                      name="salesAgent"
                      required
                    >
                      <option value="">Select Sales Agent:</option>
                      {agents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status:</label>
                    <select
                      className="form-select mb-3"
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Priority:</label>
                    <select
                      className="form-select mb-3"
                      value={formData.priority}
                      onChange={handleChange}
                      name="priority"
                    >
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Time to Close:
                    </label>
                    <input
                      type="number"
                      className="form-control mb-3"
                      name="timeToClose"
                      value={formData.timeToClose}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Tags:</label>
                    <div className="row">
                      {tagOptions.map((tag) => (
                        <div className="col-md-2" key={tag}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={tag}
                              value={tag}
                              onChange={handleTagChange}
                              checked={formData.tags.includes(tag)}
                            />
                            <label className="form-check-label" htmlFor={tag}>
                              {tag}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary fw-semibold w-50 mt-4"
                    type="submit"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AddLead;
