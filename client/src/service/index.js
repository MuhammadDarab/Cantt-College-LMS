import axios from "axios";
const service = axios.create({
  baseURL: "https://cantt-college-server.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default service;