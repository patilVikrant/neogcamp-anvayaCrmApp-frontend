import { createContext, useContext } from "react";

export const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);

export default useLeadContext;
