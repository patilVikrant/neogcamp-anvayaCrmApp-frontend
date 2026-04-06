import { LeadContext } from "./LeadContext";
import api from "../api/axiosConfig";
import { useEffect, useState } from "react";

export default function LeadProvider({ children }) {
  const [leads, setLeads] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: [],
    timeToClose: "",
    priority: "High",
  });

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await api.get("/leads");
      // console.log(res);
      setLeads(res.data);
    };

    fetchLeads();
  }, []);

  const addNewLead = async (lead) => {
    const newLead = await api.post("/leads", lead);
    setLeads((prevValue) => [...prevValue, newLead.data.lead]);
  };

  const deleteLead = async (id) => {
    const deletedLead = await api.delete(`/leads/${id}`);
    setLeads((prevValue) =>
      prevValue.filter((lead) => lead._id !== deletedLead.data.lead._id),
    );
  };

  const updateLead = async (id, data) => {
    const updatedLead = await api.post(`/leads/${id}`, data);
    setLeads((prevValue) =>
      prevValue.map((lead) => {
        if (lead._id === id) {
          return updatedLead.data.lead;
        } else {
          return lead;
        }
      }),
    );
  };

  const getLeadsAddedInLastSevenDays = (leads) => {
    const dateSevenDaysAgo = new Date();
    dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);
    // console.log(dateSevenDaysAgo);

    return leads.filter((lead) => {
      const leadCreationDate = new Date(lead.createdAt);
      // console.log(leadCreationDate);

      return leadCreationDate >= dateSevenDaysAgo;
    });
  };

  const getDataForClosedLeads = (leads) => {
    const leadsAddedInLastSevenDays = getLeadsAddedInLastSevenDays(leads);

    // console.log(leadsAddedInLastSevenDays);

    const numberOfLeadsAddedInLastSevenDays = leadsAddedInLastSevenDays.length;
    // console.log(numberOfLeadsAddedInLastSevenDays);

    // Number of leads closed in last 7 days
    const wonLeads = leadsAddedInLastSevenDays.filter(
      (lead) => lead.status === "Closed",
    ).length;
    // console.log(wonLeads);

    const lostLeads = numberOfLeadsAddedInLastSevenDays - wonLeads;
    // console.log(lostLeads);

    const winPercent = (wonLeads / numberOfLeadsAddedInLastSevenDays) * 100;
    // console.log(winPercent);

    const lossPercent = (lostLeads / numberOfLeadsAddedInLastSevenDays) * 100;
    // console.log(lossPercent);

    return {
      numberOfLeadsAddedInLastSevenDays,
      wonLeads,
      lostLeads,
      winPercent,
      lossPercent,
    };
  };

  const getLeadsInPipelineByStatus = (leads) => {
    const totalLeadsInPipeline = leads.filter(
      (lead) => lead.status !== "Closed",
    );

    const leadsInPipelineByStatus = {};

    totalLeadsInPipeline.forEach((lead) => {
      leadsInPipelineByStatus[lead.status] =
        (leadsInPipelineByStatus[lead.status] || 0) + 1;
    });

    return { totalLeadsInPipeline, leadsInPipelineByStatus };
  };

  const getLeadsDataByStatus = (leads) => {
    const totalNumberOfLeads = leads.length;

    const leadByStatus = {};

    leads.forEach((lead) => {
      leadByStatus[lead.status] = (leadByStatus[lead.status] || 0) + 1;
    });

    const newLeadPercent = (
      (leadByStatus.New / totalNumberOfLeads) *
      100
    ).toFixed(2);
    const closedLeadPercent = (
      (leadByStatus.Closed / totalNumberOfLeads) *
      100
    ).toFixed(2);
    const proposalSentLeadPercent = (
      (leadByStatus["Proposal Sent"] / totalNumberOfLeads) *
      100
    ).toFixed(2);
    const qualifiedLeadPercent = (
      (leadByStatus.Qualified / totalNumberOfLeads) *
      100
    ).toFixed(2);
    const contactedLeadPercent = (
      (leadByStatus.Contacted / totalNumberOfLeads) *
      100
    ).toFixed(2);

    return {
      leadByStatus,
      newLeadPercent,
      closedLeadPercent,
      proposalSentLeadPercent,
      qualifiedLeadPercent,
      contactedLeadPercent,
    };
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        addNewLead,
        deleteLead,
        updateLead,
        formData,
        setFormData,
        getDataForClosedLeads,
        getLeadsInPipelineByStatus,
        getLeadsDataByStatus,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
