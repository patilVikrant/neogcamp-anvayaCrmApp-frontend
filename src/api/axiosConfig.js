import axios from "axios";

const api = axios.create({
  baseURL: "https://neogcamp-anvaya-crm-app-backend.vercel.app",
});

export default api;
