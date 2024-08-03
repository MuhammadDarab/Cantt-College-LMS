import axios from "axios";
const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default service;