import axios from "axios";

const api = axios.create({
  baseURL: "https://axentra-crm-app-backend.vercel.app/",
});

export default api;
