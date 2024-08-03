import axios from "axios";
const service = axios.create({
  baseURL: "https://arbitrary-elsi-test-orgs-3dafdc13.koyeb.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default service;