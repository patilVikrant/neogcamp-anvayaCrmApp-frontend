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
            <div className="card border-0 shadow-sm rounded-2">
              <div className="card-header bg-white">
                <h4>Lead Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-10 mb-2">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Lead Name:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        {selectedLead?.name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-4">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Source:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        {selectedLead?.source}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-4">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Status:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        <span
                          className={`${getStatusClass(selectedLead?.status)} px-3 py-2 rounded-2`}
                        >
                          {selectedLead?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-4">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Priority:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        <span
                          className={`${getPriorityClass(selectedLead?.priority)} px-3 py-2 rounded-2`}
                        >
                          {selectedLead?.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-2">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Sales Agent:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        {selectedLead?.salesAgent.name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-2">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Time to Close:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        {`${selectedLead?.timeToClose} days`}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mb-2">
                    <div className="row">
                      <div className="col-5 text-muted pe-2 fw-semibold fs-5">
                        Tags:
                      </div>
                      <div className="col-7 fw-semibold fs-5">
                        {selectedLead?.tags.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card-footer bg-white">
                  <div className="row">
                    <div className="col-4 text-muted">Created At:</div>
                    <div className="col-4 fw-semibold">
                      {formatDateAndTime(selectedLead?.createdAt)}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 text-muted">Updated At:</div>
                    <div className="col-4 fw-semibold">
                      {formatDateAndTime(selectedLead?.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!commentLoading && (
              <div className="card border-0 shadow-sm rounded-2">
                <div className="card-header bg-white">
                  <h4>Comments & Activity</h4>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div
                        style={
                          comments?.length !== 0
                            ? {
                                maxHeight: "250px",
                                overflowY: "auto",
                              }
                            : {}
                        }
                        className="card-body"
                      >
                        {comments?.length !== 0 ? (
                          <div className="d-flex flex-column gap-2">
                            {comments.map((comment) => (
                              <div
                                key={comment?._id}
                                className="d-flex flex-column gap-1"
                              >
                                <div className="d-flex flex-column">
                                  <strong>{comment?.author}</strong>
                                  <small>
                                    {formatDateAndTime(comment?.createdAt)}
                                  </small>
                                </div>
                                <div>
                                  <p>{comment?.commentText}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div className="border rounded-4 p-4 bg-light text-center mb-4">
                              <div
                                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  backgroundColor: "#e9ecfb",
                                  fontSize: "24px",
                                }}
                              >
                                💬
                              </div>
                              <h5 className="fw-bold mb-2">No comments yet</h5>
                              <p className="text-muted">
                                Start the conversation by adding the first
                                update for this lead
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <h5 className="mb-3">Add Comment</h5>
                      <form onSubmit={handleSubmit}>
                        <label className="form-label">Author:</label>
                        <select
                          className="form-select mb-4"
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
                        <label className="form-label">Comment Text:</label>
                        <input
                          className="form-control mb-4"
                          type="text"
                          name="commentText"
                          value={commentFormData.commentText}
                          onChange={handleChange}
                          required
                        />
                        <button
                          style={{ backgroundColor: "#4550b8" }}
                          className="btn w-100 fw-semibold text-white"
                        >
                          Add Comment
                        </button>
                      </form>
                    </div>
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
