import { createContext, useContext } from "react";

export const AgentContext = createContext();

const useAgentContext = () => useContext(AgentContext);

export default useAgentContext;
