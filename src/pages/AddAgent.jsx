import React, { useState } from "react";
import useAgentContext from "../contexts/AgentContext";
import { useNavigate } from "react-router-dom";

const AddAgent = () => {
  const { addNewAgent } = useAgentContext();
  const [salesAgentFormData, setSalesAgentFormData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalesAgentFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(salesAgentFormData);

    await addNewAgent(salesAgentFormData);
    setSalesAgentFormData({
      name: "",
      email: "",
    });
    navigate("/agents");
  };
  return (
    <div className="bg-light min-vh-100 p-4 d-flex justify-content-center">
      <div>
        <div className="card border-0 p-2 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white border-0">
            <div>
              <h2 className="mb-1 fw-bold">Add New Sales Agent</h2>
              <p className="text-muted mb-0">
                Fill in the details below to create a new sales agent.
              </p>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="form-label fw-semibold">
                Sales Agent Name:
              </label>
              <input
                type="text"
                name="name"
                value={salesAgentFormData.name}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
              <label className="form-label fw-semibold">Email:</label>
              <input
                type="text"
                name="email"
                value={salesAgentFormData.email}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
              <button
                className="btn btn-primary fw-semibold w-100 mt-4"
                type="submit"
              >
                Add Sales Agent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
