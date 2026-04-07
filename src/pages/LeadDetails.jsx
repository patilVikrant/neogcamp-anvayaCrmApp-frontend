import { useParams, Link, useNavigate } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";
import api from "../api/axiosConfig";
import { useEffect, useState } from "react";
import useAgentContext from "../contexts/AgentContext";

const LeadDetails = () => {
  const { leads, deleteLead, setFormData } = useLeadContext();
  const [comments, setComments] = useState(null);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentFormData, setCommentFormData] = useState({
    author: "",
    commentText: "",
  });
  const { agents } = useAgentContext();
  const { id } = useParams();
  // console.log(id);
  // console.log(leads);
  // console.log(comments);
  // console.log(commentLoading);

  // console.log(agents);

  const selectedLead = leads && leads.find((lead) => lead._id === id);
  // console.log(selectedLead);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCommentsForLead = async (id) => {
      try {
        setCommentLoading(true);
        const allComments = await api.get(`/leads/${id}/comments`);
        setComments(allComments.data);
      } catch (error) {
        console.log(error);
        setComments([]);
      } finally {
        setCommentLoading(false);
      }
    };
    fetchAllCommentsForLead(id);
  }, [id]);

  const addNewComment = async (id, data) => {
    const newComment = await api.post(`/leads/${id}/comments`, data);
    setComments((prevValue) => [...prevValue, newComment.data.comment]);
  };

  const formatDateAndTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

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

  const handleLeadDelete = async () => {
    try {
      await deleteLead(id);
      navigate("/leads");
    } catch (error) {
      console.log("Failed to delete the Lead", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(commentFormData);
    addNewComment(id, commentFormData);
    setCommentFormData({ author: "", commentText: "" });
  };

  const editFormDefaultValue = () =>
    setFormData({
      name: selectedLead.name,
      source: selectedLead.source,
      salesAgent: selectedLead.salesAgent._id,
      status: selectedLead.status,
      tags: selectedLead.tags,
      timeToClose: selectedLead.timeToClose,
      priority: selectedLead.priority,
    });

  return (
    <div className="bg-light min-vh-100 p-4">
      {!leads || !agents || commentLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>{selectedLead?.name}</h1>
              <p className="text-muted">Lead Details and Activity</p>
            </div>
            <div className="d-flex gap-2">
              <Link
                to={`/edit-lead/${selectedLead?._id}`}
                className="btn btn-info fw-semibold text-white"
                onClick={() => editFormDefaultValue()}
              >
                Edit
              </Link>
              <button
                onClick={handleLeadDelete}
                className="btn btn-danger fw-semibold"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="d-flex flex-column gap-4 mt-3">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-semibold">Lead Information</h5>
              </div>

              <div className="card-body">
                <div className="row gy-3">
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Lead Name</div>
                    <div className="w-50 fw-medium">{selectedLead?.name}</div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Source</div>
                    <div className="w-50 fw-medium">{selectedLead?.source}</div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Status</div>
                    <div className="w-50 fw-medium">
                      <span
                        className={`${getStatusClass(selectedLead?.status)} px-2 py-1 rounded`}
                      >
                        {selectedLead?.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Priority</div>
                    <div className="w-50 fw-medium">
                      <span
                        className={`${getPriorityClass(selectedLead?.priority)} px-2 py-1 rounded`}
                      >
                        {selectedLead?.priority}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Sales Agent</div>
                    <div className="w-50 fw-medium">
                      {selectedLead?.salesAgent.name}
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Time to Close</div>
                    <div className="w-50 fw-medium">{`${selectedLead?.timeToClose} days`}</div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="w-50">Tags</div>
                    <div className="w-50 fw-medium">
                      {selectedLead?.tags.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-white small text-muted">
                <div className="d-flex flex-column">
                  <span>
                    Created At: {formatDateAndTime(selectedLead?.createdAt)}
                  </span>
                  <span>
                    Updated At: {formatDateAndTime(selectedLead?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {!commentLoading && (
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-semibold">Comments & Activity</h5>
                </div>

                <div className="card-body">
                  <div
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                    className="mb-4"
                  >
                    {comments?.length !== 0 ? (
                      <div className="d-flex flex-column gap-3">
                        {[...comments]
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt),
                          )
                          .map((comment) => (
                            <div
                              key={comment._id}
                              className="border-bottom pb-2"
                            >
                              <div className="d-flex justify-content-between">
                                <strong>{comment.author}</strong>
                                <small className="text-muted">
                                  {formatDateAndTime(comment.createdAt)}
                                </small>
                              </div>
                              <p className="mb-0 small">
                                {comment.commentText}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-muted text-center">No comments yet</p>
                    )}
                  </div>

                  <div>
                    <h5 className="fw-semibold mb-3">Add Comment</h5>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <select
                          className="form-select"
                          name="author"
                          value={commentFormData.author}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Author</option>
                          {agents.map((agent) => (
                            <option key={agent._id} value={agent._id}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <input
                          className="form-control"
                          type="text"
                          name="commentText"
                          value={commentFormData.commentText}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        className="btn text-white w-100 fw-semibold"
                        style={{ backgroundColor: "#4550b8" }}
                      >
                        Add Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeadDetails;
