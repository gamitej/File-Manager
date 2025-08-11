import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
});

export default api;
